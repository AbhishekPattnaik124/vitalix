import asyncio
import os
import numpy as np
import uuid
from datetime import datetime
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

async def init_vitalix_db():
    print("Initiating Vitalix OS Database Synthesis...")
    
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/vitalix")
    client = AsyncIOMotorClient(MONGO_URI)
    db = client.vitalix
    
    # 1. Clear existing data if any (Fresh Startup)
    # Warning: Only for initial onboarding
    confirm = input("Are you sure you want to initialize the 'vitalix' database? This will clear existing records. (y/n): ")
    if confirm.lower() != 'y':
        print("Initialization aborted.")
        return

    await db.medicines.delete_many({})
    await db.appointments.delete_many({})
    await db.orders.delete_many({})
    await db.restocks.delete_many({})
    await db.users.delete_many({})
    
    print("Core Vectors Cleared. Injecting Fresh Logistics Hub & Personnel...")

    # 2. Seed Users (Admin & Doctors)
    users = [
        {"email": "admin@vitalix.com", "password": "admin123", "role": "admin", "name": "System Administrator"},
        {"email": "alice.chen@vitalix.com", "password": "cardio2026", "role": "doctor", "name": "Dr. Alice Chen", "location": "City Central Clinic"},
        {"email": "r.kumar@vitalix.com", "password": "blood2026", "role": "doctor", "name": "Dr. Rajesh Kumar", "location": "Global Health Institute"},
        {"email": "emily.thorne@vitalix.com", "password": "neuro2026", "role": "doctor", "name": "Dr. Emily Thorne", "location": "Westside Speciality"}
    ]
    await db.users.insert_many(users)
    print("Personnel Auth Nodes Synchronized.")

    # 3. Seed Medicines (100 SKUs)
    bases = ["Amoxicillin", "Metformin", "Lisinopril", "Atorvastatin", "Amlodipine", "Albuterol", "Omeprazole", "Losartan", "Gabapentin", "Hydrochlorothiazide"]
    meds = []
    for i in range(100):
        meds.append({
            "id": 1000 + i,
            "name": f"{bases[i % 10]} - Gen {i//10 + 1}",
            "dosage": f"{[10, 50, 100, 250, 500][i % 5]}mg",
            "price": float(np.random.randint(50, 850)),
            "quantity": int(np.random.randint(20, 100)),
            "category": "Pharmaceutical",
            "timestamp": datetime.now().isoformat()
        })
    await db.medicines.insert_many(meds)
    print(f"Success: 100 Pharmaceutical SKUs injected into 'medicines' collection.")

    # 3. Dummy Admin Authorization
    print("Database 'vitalix' is now active and provisioned.")
    print("You can now launch 'python main.py' to serve the Quantum Mainframe.")

if __name__ == "__main__":
    asyncio.run(init_vitalix_db())
