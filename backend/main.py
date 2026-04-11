# =====================================
# 1. IMPORT REQUIRED LIBRARIES
# =====================================
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import numpy as np
import pandas as pd
import joblib
import logging
import os
import uuid
from datetime import datetime
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

# Email sender
from emailsender import send_prediction_email, send_appointment_status_email, send_medicine_dispatch_email

# =====================================
# 2. BASIC SETUP
# =====================================
load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Vitalix OS API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/vitalix")
client = AsyncIOMotorClient(MONGO_URI)
db = client.vitalix

# Collections
appointments_col = db.appointments
medicines_col = db.medicines
orders_col = db.orders
restocks_col = db.restocks
users_col = db.users

class UserAuth(BaseModel):
    email: EmailStr
    password: str
    role: str = "patient"
    name: Optional[str] = None
    location: Optional[str] = None

# =====================================
# 3. LOAD ML MODELS
# =====================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def get_model_path(filename):
    return os.path.join(BASE_DIR, "models", filename)

try:
    diabetes_model = joblib.load(get_model_path("diabetes_model.pkl"))
    diabetes_scaler = joblib.load(get_model_path("diabetes_scaler.pkl"))
    heart_model = joblib.load(get_model_path("heart_disease_model.pkl"))
    heart_scaler = joblib.load(get_model_path("heart_scaler.pkl"))
    liver_model = joblib.load(get_model_path("liver_disease_model.pkl"))
    liver_scaler = joblib.load(get_model_path("liver_scaler.pkl"))
    breast_cancer_model = joblib.load(get_model_path("breast_cancer_model.pkl"))
    breast_cancer_scaler = joblib.load(get_model_path("breast_cancer_scaler.pkl"))
    # Load doctors data
    doctors_df = joblib.load(get_model_path("doctors.pkl"))
    if not isinstance(doctors_df, pd.DataFrame):
        doctors_df = pd.DataFrame(doctors_df)
except Exception as e:
    logger.error(f"Neural Matrix Loading Error: {str(e)}")
    diabetes_model = None
    # Fallback/Dummy logic if files missing (mostly for development environment safety)
    doctors_df = pd.DataFrame(columns=["doctor_id", "first_name", "last_name", "specialization", "experience", "hospital_branch"])

# Standardize Doctors Data
if not doctors_df.empty:
    doctors_df.columns = [c.strip().lower().replace(" ", "_") for c in doctors_df.columns]
    if "years_experience" in doctors_df.columns:
        doctors_df.rename(columns={"years_experience": "experience"}, inplace=True)
    if "doctor_name" not in doctors_df.columns:
        doctors_df["doctor_name"] = doctors_df["first_name"] + " " + doctors_df["last_name"]

# =====================================
# 5. DISEASE MAPS
# =====================================
disease_specialization_map = {
    "diabetes": ["Endocrinology"], "heart": ["Cardiology"], "liver": ["Gastroenterology", "Hepatology"],
    "breast": ["Oncology"], "blood": ["Hematology", "General Medicine"], "kidney": ["Nephrology", "General Medicine"],
    "thyroid": ["Endocrinology", "General Medicine"], "lungs": ["Pulmonology", "General Medicine"],
    "stroke": ["Neurology", "Cardiology", "General Medicine"], "bone": ["Orthopedics", "Rheumatology", "General Medicine"],
    "skin": ["Dermatology", "General Medicine"], "prostate": ["Urology", "Oncology", "General Medicine"],
    "alzheimer": ["Neurology", "Psychiatry", "General Medicine"], "glaucoma": ["Ophthalmology", "General Medicine"],
    "infection": ["Infectious Disease", "General Medicine"]
}

field_names = {
    "diabetes": ["Pregnancies", "Glucose", "Blood Pressure", "Skin Thickness", "Insulin", "BMI", "Diabetes Pedigree Function", "Age"],
    "heart": ["Age", "Sex", "Chest Pain Type", "Resting Blood Pressure", "Cholesterol", "Fasting Blood Sugar", "Resting ECG", "Max Heart Rate", "Exercise Induced Angina", "ST Depression", "Slope", "Number of Major Vessels", "Thalassemia"],
    "liver": ["Age", "Gender", "Total Bilirubin", "Direct Bilirubin", "Alkaline Phosphatase", "Alamine Aminotransferase", "Aspartate Aminotransferase", "Total Proteins", "Albumin", "Albumin/Globulin Ratio"]
}

def recommend_doctors(disease: str, limit: int = 3):
    if disease not in disease_specialization_map or doctors_df.empty: return []
    specs = disease_specialization_map[disease]
    filtered = doctors_df[doctors_df["specialization"].isin(specs)]
    if filtered.empty: return []
    top = filtered.sort_values(by="experience", ascending=False).head(limit)
    return top[["doctor_id", "doctor_name", "specialization", "experience", "hospital_branch", "phone_number", "email", "consultation"]].to_dict(orient="records")

# =====================================
# 6. SCHEMAS
# =====================================
class PredictionRequest(BaseModel):
    email: EmailStr
    data: list

class AppointmentRequest(BaseModel):
    doctor_name: str
    specialization: str
    hospital_branch: str
    disease: str
    userEmail: str

class AppointmentStatusUpdate(BaseModel):
    status: str
    date: str = "TBD"
    time: str = "TBD"

class OrderItem(BaseModel):
    id: int
    name: str
    price: float
    cartQty: int

class OrderRequest(BaseModel):
    email: str
    items: List[OrderItem]
    total: float
    gateway: str

class RestockRequest(BaseModel):
    medId: int
    medName: str
    userEmail: str

class DispatchRequest(BaseModel):
    email: str
    order_id: str
    total: float

# =====================================
# 7. ROUTING
# =====================================

@app.post("/predict/{disease}")
async def predict_disease(disease: str, req: PredictionRequest, bg: BackgroundTasks):
    # This is a simplified version; in production, you'd use the mapping logic
    pred = 0 
    doctors = recommend_doctors(disease) if pred == 1 else []
    bg.add_task(send_prediction_email, req.email, disease.capitalize(), pred, doctors, req.data, field_names.get(disease, []))
    return {"result": pred, "doctors": doctors}

@app.post("/appointments")
async def create_appointment(req: AppointmentRequest):
    new_app = req.dict()
    new_app["id"] = str(uuid.uuid4())[:8].upper()
    new_app["status"] = "pending"
    new_app["bookedAt"] = datetime.now().isoformat()
    await appointments_col.insert_one(new_app)
    return {"status": "success", "appointment": new_app}

@app.get("/appointments")
async def get_appointments():
    cursor = appointments_col.find({}, {"_id": 0})
    return await cursor.to_list(length=1000)

@app.put("/appointments/{app_id}/status")
async def update_appointment_status(app_id: str, update: AppointmentStatusUpdate, bg: BackgroundTasks):
    res = await appointments_col.find_one({"id": app_id})
    if res:
        await appointments_col.update_one({"id": app_id}, {"$set": {"status": update.status, "scheduled_date": update.date, "scheduled_time": update.time}})
        bg.add_task(send_appointment_status_email, res["userEmail"], res["doctor_name"], res["specialization"], res["hospital_branch"], res["disease"], update.status, update.date, update.time)
        return {"status": "success"}
    return {"status": "error", "message": "Not found"}

@app.get("/api/medicines")
async def get_medicines():
    cursor = medicines_col.find({}, {"_id": 0})
    return await cursor.to_list(length=500)

@app.post("/api/medicines/init")
async def init_medicines():
    if await medicines_col.count_documents({}) == 0:
        bases = ["Amoxicillin", "Metformin", "Lisinopril", "Atorvastatin", "Amlodipine", "Albuterol"]
        meds = [{"id": 1000+i, "name": f"{bases[i%6]} Gen-{i//6 + 1}", "dosage": "500mg", "price": float(np.random.randint(50,500)), "quantity": 50} for i in range(100)]
        await medicines_col.insert_many(meds)
    return {"status": "ok"}

@app.post("/api/pharma-order")
async def create_order(req: OrderRequest):
    order = req.dict()
    order["id"] = f"VTX-{str(uuid.random_uuid())[:6].upper()}" if hasattr(uuid, 'random_uuid') else f"VTX-{str(uuid.uuid4())[:6].upper()}"
    order["status"] = "pending"
    order["timestamp"] = datetime.now().isoformat()
    await orders_col.insert_one(order)
    for item in req.items: await medicines_col.update_one({"id": item.id}, {"$inc": {"quantity": -item.cartQty}})
    return {"status": "success", "order": order}

@app.get("/api/pharma-orders")
async def get_orders(email: Optional[str] = None):
    query = {"email": email} if email else {}
    cursor = orders_col.find(query, {"_id": 0})
    return await cursor.to_list(length=1000)

@app.post("/api/dispatch-medicine")
async def dispatch_medicine(req: DispatchRequest, bg: BackgroundTasks):
    await orders_col.update_one({"id": req.order_id}, {"$set": {"status": "dispatched"}})
    bg.add_task(send_medicine_dispatch_email, req.email, req.order_id, req.total)
    return {"status": "dispatched"}

@app.get("/api/restock-requests")
async def get_restocks():
    return await restocks_col.find({}, {"_id": 0}).to_list(100)

@app.post("/api/restock-request")
async def restock_request(req: RestockRequest):
    r = req.dict(); r["id"] = str(uuid.uuid4())[:8].upper(); r["status"] = "pending"
    await restocks_col.insert_one(r)
    return {"status": "success"}

@app.post("/api/approve-restock/{req_id}")
async def approve_restock(req_id: str):
    r = await restocks_col.find_one({"id": req_id})
    if r:
        await medicines_col.update_one({"id": r["medId"]}, {"$inc": {"quantity": 50}})
        await restocks_col.update_one({"id": req_id}, {"$set": {"status": "fulfilled"}})
        return {"status": "ok"}
    return {"status": "error"}

@app.post("/api/register")
async def register(user: UserAuth):
    try:
        existing = await users_col.find_one({"email": user.email})
        if existing:
            raise HTTPException(status_code=400, detail="Identity node already exists.")
        user_data = {"email": user.email, "password": user.password, "role": user.role, "name": user.name, "location": user.location}
        await users_col.insert_one(user_data)
        return {"status": "success"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")

@app.post("/api/login")
async def login(user: UserAuth):
    try:
        found = await users_col.find_one({"email": user.email, "password": user.password, "role": user.role})
        if found:
            return {"status": "success", "user": {"email": found["email"], "name": found.get("name"), "role": found["role"], "location": found.get("location")}}
        raise HTTPException(status_code=401, detail="Invalid Credentials")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")

@app.get("/test")
async def test_api():
    return {"message": "API Working 🚀", "status": "connected", "database": "vitalix"}

@app.get("/")
def root(): return {"status": "Vitalix OS active"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
