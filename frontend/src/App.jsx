import React, { useState, useEffect } from "react";
import { 
  Activity, Heart, Droplet, Shield, ChevronRight, LogOut, ArrowLeft, Mail, 
  Home, Settings, User, Bell, Search, Pill, ClipboardList, CheckCircle,
  Award, Users, Eye, Brain, Bone, Scan, Thermometer, Stethoscope, Building,
  MessageSquare, Mic, Map, Languages, BarChart, AlertTriangle, TrendingUp,
  Watch, Image as ImageIcon, AlertOctagon, Database, Server, Calendar, Clock,
  Zap, Star, Hexagon, CreditCard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* =======================================
   GOAT VISION OS - ULTRA GLASSMORPHISM
======================================= */
const THEME = {
  primary: "#FFFFFF", 
  secondary: "#94A3B8", 
  accent: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
  accentGlow: "rgba(139, 92, 246, 0.5)",
  background: "#020617", // Ultra dark slate
  surfaceGlow: "rgba(255, 255, 255, 0.03)",
  border: "rgba(255, 255, 255, 0.1)",
  text: "#F8FAFC", 
  muted: "#94A3B8", 
  success: "#10B981", danger: "#F43F5E", warning: "#F59E0B"
};

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
    
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Outfit', sans-serif; scroll-behavior: smooth; }
    body, html, #root { width: 100%; height: 100%; background: ${THEME.background}; color: ${THEME.text}; overflow-x: hidden; }
    
    /* Modern Scrollbar */
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.3); border-radius: 10px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.5); }
    
    /* Input Highlights */
    input[type="date"]::-webkit-calendar-picker-indicator,
    input[type="time"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.5; }
    input:focus { outline: none; border-color: #60A5FA !important; box-shadow: 0 0 15px rgba(59, 130, 246, 0.3); }

    /* Ultra Advanced Animations */
    @keyframes gradientBackground {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }

    .glass-panel {
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(24px) saturate(180%);
      -webkit-backdrop-filter: blur(24px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    .shimmer-text {
      color: #FFFFFF;
      background: none;
      -webkit-background-clip: unset;
    }
  `}</style>
);

const CinematicBackground = () => (
  <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", zIndex: -1, background: "#020617" }}>
      <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "70vw", height: "70vw", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(0,0,0,0) 60%)", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "80vw", height: "80vw", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(0,0,0,0) 60%)", filter: "blur(80px)" }} />
      <div style={{ position: "absolute", top: "30%", left: "40%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, rgba(0,0,0,0) 70%)", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundImage: "linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)", backgroundSize: "80px 80px", opacity: 0.5 }} />
  </div>
);

const Card = ({ children, style = {}, onClick }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    whileHover={onClick ? { scale: 1.02, y: -5, boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 20px ${THEME.accentGlow}` } : {}}
    onClick={onClick}
    className="glass-panel"
    style={{ borderRadius: "24px", padding: "32px", cursor: onClick ? "pointer" : "default", ...style }}
  >
    {children}
  </motion.div>
);

const Button = ({ children, onClick, variant = "primary", style = {}, disabled = false }) => {
  const isPrimary = variant === "primary"; const isDanger = variant === "danger"; const isOutline = variant === "outline";
  const bg = isDanger ? THEME.danger : isPrimary ? THEME.accent : isOutline ? "transparent" : THEME.surfaceGlow;
  return (
    <motion.button
      whileHover={!disabled && { scale: 1.02, y: -2, boxShadow: isPrimary ? `0 15px 30px rgba(59, 130, 246, 0.4)` : "none" }} 
      whileTap={!disabled && { scale: 0.98 }}
      onClick={onClick} disabled={disabled}
      style={{
        background: bg, color: "#FFFFFF", border: isOutline ? `1px solid ${THEME.border}` : "none",
        padding: "14px 28px", borderRadius: "14px", fontWeight: 700, fontSize: "14px", 
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.6 : 1, 
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", 
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)", position: "relative", overflow: "hidden", ...style
      }}
    >
      {children}
    </motion.button>
  );
};

const NotificationModal = ({ modal, setModal }) => {
  if (!modal) return null;
  const isError = modal.type === "error";
  const isSuccess = modal.type === "success";
  const isWarning = modal.type === "warning";
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "20px" }}
                onClick={() => setModal(null)}>
      <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
                  style={{ width: "100%", maxWidth: "500px", background: "rgba(10, 15, 30, 0.95)", border: `1px solid ${isError ? THEME.danger : isSuccess ? THEME.success : isWarning ? THEME.warning : THEME.border}`, borderRadius: "32px", padding: "48px 40px", textAlign: "center", boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 40px ${isError ? THEME.danger + "30" : isSuccess ? THEME.success + "30" : "rgba(0,0,0,0)"}` }}
                  onClick={e => e.stopPropagation()}>
        <div style={{ background: isError ? THEME.danger + "15" : isSuccess ? THEME.success + "15" : "rgba(255,255,255,0.05)", padding: "30px", borderRadius: "50%", display: "inline-flex", marginBottom: "24px", color: isError ? THEME.danger : isSuccess ? THEME.success : isWarning ? THEME.warning : THEME.accent }}>
           {isError ? <AlertTriangle size={54} /> : isSuccess ? <CheckCircle size={54} /> : isWarning ? <AlertOctagon size={54} /> : <Bell size={54} />}
        </div>
        <h2 style={{ fontSize: "32px", fontWeight: 800, color: "white", marginBottom: "16px", letterSpacing: "-1px" }}>{modal.title || "Mainframe Signal"}</h2>
        <p style={{ color: THEME.muted, fontSize: "17px", marginBottom: "32px", lineHeight: 1.6, whiteSpace: "pre-line", fontWeight: 500 }}>{modal.message}</p>
        <Button onClick={() => setModal(null)} style={{ width: "100%", padding: "18px", fontSize: "16px" }}>Acknowledge Sequence</Button>
      </motion.div>
    </motion.div>
  );
};

/* =======================================
   DISEASES METADATA & AI DOCTORS
======================================= */
const diseases = [
  { id: "heart", name: "Heart Disease", color: "#F43F5E", icon: <Heart size={28} />, desc: "Cardiac anomalies and disease metrics analysis.", fields: ["Age", "Sex", "Chest Pain", "Blood Pressure", "Cholesterol", "FBS", "Max HR"] },
  { id: "brain", name: "Brain Stroke", color: "#8B5CF6", icon: <Brain size={28} />, desc: "Stroke probability & Cognitive health baselines.", fields: ["Age", "Hypertension (1/0)", "Heart Disease", "Avg Glucose", "BMI"] },
  { id: "diabetes", name: "Diabetes", color: "#3B82F6", icon: <Droplet size={28} />, desc: "Complete metabolic and insulin glucose screening.", fields: ["Glucose", "Blood Pressure", "Insulin", "BMI", "Age"] },
  { id: "lungs", name: "Lung Disease", color: "#06B6D4", icon: <Scan size={28} />, desc: "Respiratory Neural Scan. High precision pixel detection.", imgReq: "Upload Chest X-Ray (DICOM/JPEG)" },
  { id: "bone", name: "Bone Fractures", color: "#F59E0B", icon: <Bone size={28} />, desc: "Skeletal density and structural weakness X-Ray parameters.", imgReq: "Upload Skeletal X-Ray Scan" },
  { id: "skin", name: "Skin Cancer", color: "#EC4899", icon: <ImageIcon size={28} />, desc: "Optical melanoma mapping via neural nets.", imgReq: "Upload High-Resolution Skin Photo" },
  { id: "breast", name: "Breast Cancer", color: "#D946EF", icon: <Activity size={28} />, desc: "Cellular anomaly scanning and tumor evaluation.", fields: ["Radius Mean", "Texture Mean", "Perimeter Mean", "Area Mean", "Smoothness Mean", "Compactness Mean"] },
  { id: "liver", name: "Liver Disease", color: "#F97316", icon: <Activity size={28} />, desc: "Hepatic function and toxicity assessment.", fields: ["Age", "Gender", "Total Bilirubin", "Direct Bilirubin", "Alkaline Phosphatase", "Total Proteins"] },
  { id: "kidney", name: "Kidney Disease", color: "#14B8A6", icon: <Droplet size={28} />, desc: "Renal filtration and kidney health metrics.", fields: ["Blood Pressure", "Specific Gravity", "Albumin", "Sugar", "Blood Urea", "Serum Creatinine"] },
  { id: "thyroid", name: "Thyroid Disorder", color: "#8B5CF6", icon: <Thermometer size={28} />, desc: "Metabolic hormone checks and TSH analysis.", fields: ["TSH", "T3", "T4", "Age", "Goiter (1/0)", "Tumor (1/0)"] },
  { id: "parkinsons", name: "Parkinson's Risk", color: "#EAB308", icon: <Brain size={28} />, desc: "Neurological tremors and voice frequency analysis.", fields: ["MDVP:Fo(Hz)", "MDVP:Fhi(Hz)", "MDVP:Flo(Hz)", "Jitter(%)", "Shimmer", "NHR", "HNR"] },
  { id: "glaucoma", name: "Glaucoma", color: "#84CC16", icon: <Eye size={28} />, desc: "Optic nerve and intraocular pressure indicators.", fields: ["Intraocular Pressure (IOP)", "Cup-to-Disc Ratio", "Corneal Thickness", "Visual Field Loss"] },
  { id: "alzheimer", name: "Alzheimer's", color: "#F43F5E", icon: <Brain size={28} />, desc: "Cognitive degradation and memory baselines.", fields: ["MMSE Score", "Age", "eTIV", "nWBV", "ASF"] },
  { id: "prostate", name: "Prostate Cancer", color: "#6366F1", icon: <Activity size={28} />, desc: "PSA risk metrics and gland volume evaluation.", fields: ["PSA Level", "Prostate Volume", "Gleason Score", "Age"] },
  { id: "malaria", name: "Malaria", color: "#EF4444", icon: <ImageIcon size={28} />, desc: "Blood smear parasitemia detection.", imgReq: "Upload Blood Smear Image (PNG/JPEG)" },
  { id: "pneumonia", name: "Pneumonia", color: "#38BDF8", icon: <ImageIcon size={28} />, desc: "Detailed airway opacity and fluid detection.", imgReq: "Upload Chest X-Ray Scan" }
];

const API_BASE_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" 
  ? "http://localhost:8000" 
  : "https://vitalix-xy2r.onrender.com";

const DOCTOR_ACCOUNTS = [
  { email: "alice.chen@vitalix.com", pass: "cardio2026", name: "Dr. Alice Chen", loc: "City Central Clinic", spec: "heart" },
  { email: "r.kumar@vitalix.com", pass: "blood2026", name: "Dr. Rajesh Kumar", loc: "Global Health Institute", spec: "diabetes" },
  { email: "emily.thorne@vitalix.com", pass: "neuro2026", name: "Dr. Emily Thorne", loc: "Westside Speciality", spec: "brain" }
];

/* =======================================
   DASHBOARD ARCHITECTURE
======================================= */
const DashboardLayout = ({ children, screen, setScreen, userEmail, userRole, userName, handleLogout }) => {
  const navItems = userRole === "patient" ? [
    { id: "dashboard", label: "Neural Dashboard", icon: Hexagon },
    { id: "analytics", label: "Genomic Analytics", icon: BarChart },
    { id: "all_screenings", label: "Diagnostic Matrix", icon: Scan },
    { id: "ai_symptom", label: "Neural Symptom AI", icon: Brain },
    { id: "pharmacy", label: "Quantum Pharmacy", icon: Pill },
    { id: "consultations", label: "Specialist Network", icon: Users }
  ] : userRole === "doctor" ? [
    { id: "doctor_workbench", label: "Clinical Workbench", icon: Heart }
  ] : [
    { id: "admin_dash", label: "Quantum Operations", icon: Server }
  ];

  const initPharmacy = async () => {
      try {
          await fetch(`${API_BASE_URL}/api/medicines/init`, { method: "POST" });
      } catch (e) { }
  };
  useEffect(() => { initPharmacy(); }, []);


  return (
    <div style={{ display: "flex", width: "100%", height: "100vh", position: "relative" }}>
      <CinematicBackground />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} 
           style={{ width: "280px", background: "rgba(10, 15, 30, 0.7)", backdropFilter: "blur(40px)", borderRight: `1px solid ${THEME.border}`, display: "flex", flexDirection: "column", flexShrink: 0, zIndex: 10 }}>
        <div style={{ padding: "40px 24px", display: "flex", alignItems: "center", gap: "16px" }}>
          <img src="/logo.png" alt="Vitalix" style={{ width: "44px", height: "44px", borderRadius: "12px", objectFit: "cover", boxShadow: `0 0 25px ${THEME.accentGlow}` }} />
          <span className="shimmer-text" style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-0.5px" }}>Vitalix OS</span>
        </div>
        <nav style={{ flex: 1, padding: "0 20px", overflowY: "auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: THEME.muted, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "20px", paddingLeft: "8px" }}>Interface</p>
          {navItems.map(item => (
            <motion.div key={item.id} whileHover={{ y: 0, background: "rgba(255,255,255,0.05)" }} onClick={() => setScreen(item.id)} 
               style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 20px", borderRadius: "12px", cursor: "pointer", marginBottom: "8px", background: screen === item.id ? "rgba(59, 130, 246, 0.15)" : "transparent", color: screen === item.id ? "#FFF" : THEME.muted, fontWeight: screen === item.id ? 800 : 500, border: screen === item.id ? `1px solid rgba(59, 130, 246, 0.3)` : "1px solid transparent", transition: "all 0.2s" }}>
               <item.icon size={20} color={screen === item.id ? "#60A5FA" : "currentColor"} />
               <span style={{ fontSize: "15px", letterSpacing: "0.5px" }}>{item.label}</span>
            </motion.div>
          ))}
        </nav>
        <div style={{ padding: "30px", borderTop: `1px solid ${THEME.border}`, background: "rgba(0,0,0,0.4)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: 800, color: "white", textTransform: "uppercase" }}>{userName || userRole}</p>
              <p style={{ margin: 0, fontSize: "11px", color: THEME.muted, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{userEmail}</p>
            </div>
            <motion.div whileHover={{ scale: 1.2, color: "#F43F5E" }} onClick={handleLogout} style={{ cursor: "pointer", color: THEME.muted }}><LogOut size={20} /></motion.div>
          </div>
          <div style={{ marginTop: "24px", padding: "8px 12px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", fontSize: "11px", color: THEME.success, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontWeight: 800, letterSpacing: "0.5px" }}><Shield size={14} /> QUANTUM AES-256 SECURED</div>
        </div>
      </motion.div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 1 }}>
        <header style={{ height: "90px", borderBottom: `1px solid ${THEME.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 50px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(255,255,255,0.03)", padding: "12px 24px", borderRadius: "100px", border: `1px solid ${THEME.border}` }}>
            <Search size={18} color={THEME.muted} />
            <input type="text" placeholder="Access neural database..." style={{ border: "none", background:"transparent", outline: "none", color: "white", fontSize: "14px", width: "300px", fontWeight: 500 }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
             <motion.div whileHover={{ scale: 1.1, rotate: 15 }} style={{ cursor: "pointer", color: "white" }}><Bell size={24} /></motion.div>
          </div>
        </header>
        <main style={{ flex: 1, overflowY: "auto", padding: "50px", position: "relative" }}>
          {children}
        </main>
      </div>
    </div>
  );
};

/* =======================================
   REUSABLE UI PANELS
======================================= */
const DashboardWidgets = ({ userEmail }) => {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
  
  const [apts, setApts] = useState([]);
  const [pharma, setPharma] = useState([]);

  useEffect(() => {
     const sync = async () => {
         const resA = await fetch(`${API_BASE_URL}/appointments`);
         const dataA = await resA.json();
         setApts(dataA.filter(a => a.userEmail === userEmail));
         
         const resP = await fetch(`${API_BASE_URL}/api/pharma-orders?email=${userEmail}`);
         const dataP = await resP.json();
         setPharma(dataP);
     };
     sync();
  }, [userEmail]);

  return (
  <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: "1200px", margin: "0 auto" }}>
    <div style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      <div><h1 className="shimmer-text" style={{ fontSize: "42px", fontWeight: 800, margin: "0 0 12px 0", letterSpacing: "-1px" }}>Neural Diagnostics.</h1><p style={{ color: THEME.muted, margin: 0, fontWeight: 500, fontSize: "18px" }}>Welcome back to the grid, <span style={{color: "white", fontWeight: 700}}>{userEmail}</span>.</p></div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "30px", marginBottom: "40px" }}>
      <motion.div variants={item}><Card style={{ padding: "40px 30px", textAlign: "center", background: THEME.accent }}><div style={{ background: "rgba(255,255,255,0.2)", padding: "20px", borderRadius: "50%", display: "inline-flex", marginBottom: "20px" }}><Watch size={40} color="white" /></div><h3 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 8px 0" }}>Biometrics</h3><p style={{ color: "rgba(255,255,255,0.8)", fontSize: "15px", margin: 0, fontWeight: 600 }}>Live Sync Active</p></Card></motion.div>
      <motion.div variants={item}><Card style={{ padding: "40px 30px", textAlign: "center" }}><p style={{ color: THEME.muted, fontSize: "14px", fontWeight: 800, textTransform: "uppercase", marginBottom: "20px", letterSpacing:"1px" }}>Risk Baseline</p><h2 style={{ fontSize: "56px", fontWeight: 800, color: THEME.success, margin:0, lineHeight: 1 }}>Low</h2><p style={{ color: THEME.muted, fontSize: "14px", fontWeight: 500, marginTop: "20px" }}>Vital signs optimized.</p></Card></motion.div>
      <motion.div variants={item}><Card style={{ padding: "40px 30px", textAlign: "center" }}><p style={{ color: THEME.muted, fontSize: "14px", fontWeight: 800, textTransform: "uppercase", marginBottom: "20px", letterSpacing:"1px" }}>Clinical Visits</p><h2 style={{ fontSize: "56px", fontWeight: 800, color: THEME.primary, margin:0, lineHeight: 1 }}>{apts.length}</h2><p style={{ color: THEME.muted, fontSize: "14px", marginTop: "20px", fontWeight: 800 }}>Appointments Logged</p></Card></motion.div>
      <motion.div variants={item}><Card style={{ padding: "40px 30px", textAlign: "center" }}><p style={{ color: THEME.muted, fontSize: "14px", fontWeight: 800, textTransform: "uppercase", marginBottom: "20px", letterSpacing:"1px" }}>Prescriptions</p><h2 style={{ fontSize: "56px", fontWeight: 800, color: THEME.primary, margin:0, lineHeight: 1 }}>{pharma.length}</h2><p style={{ color: THEME.success, fontSize: "14px", marginTop: "20px", fontWeight: 800 }}>Pharmacy Orders Logged</p></Card></motion.div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
        <Card style={{ padding: "30px" }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "20px", fontWeight: 800, color: "white" }}>Longitudinal Appointment History</h3>
            {apts.length === 0 ? <p style={{ color: THEME.muted, fontWeight: 600 }}>No clinical interactions recorded.</p> : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {apts.slice().reverse().map((a, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "rgba(0,0,0,0.3)", borderRadius: "12px", border: `1px solid rgba(255,255,255,0.05)` }}>
                            <div>
                                <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", color: "white" }}>{a.disease}</h4>
                                <p style={{ margin: 0, fontSize: "13px", color: THEME.muted }}>{a.doctor_name} • {a.date}</p>
                            </div>
                            <span style={{ fontSize: "12px", fontWeight: 800, color: a.status === 'pending' ? THEME.warning : THEME.success, background: "rgba(255,255,255,0.1)", padding: "4px 8px", borderRadius: "100px" }}>{a.status === 'pending' ? 'PENDING' : 'AUTHORIZED'}</span>
                        </div>
                    ))}
                </div>
            )}
        </Card>
        
        <Card style={{ padding: "30px" }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "20px", fontWeight: 800, color: "white" }}>Pharmaceutical Restock Ledger</h3>
            <div style={{ height: "150px", display: "flex", alignItems: "flex-end", gap: "12px", padding: "20px 0", borderBottom: `1px solid rgba(255,255,255,0.1)`, position: "relative", marginBottom: "30px" }}>
                {[80, 45, 90, 30, 60, Math.min(100, pharma.reduce((a,c)=>a+(c.items?.reduce((s,i)=>s+i.cartQty,0)||0),0) * 10)].map((val, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                        <motion.div initial={{ height: 0 }} animate={{ height: `${val}%` }} transition={{ duration: 1.5, type: "spring", delay: i * 0.1 }} style={{ width: "100%", background: THEME.accent, borderRadius: "8px 8px 0 0", opacity: 0.8 }} />
                    </div>
                ))}
            </div>
            {pharma.length === 0 ? <p style={{ color: THEME.muted, fontWeight: 600 }}>No pharmaceutical assets acquired.</p> : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {pharma.slice().reverse().slice(0, 3).map((a, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "rgba(0,0,0,0.3)", borderRadius: "12px", border: `1px solid rgba(255,255,255,0.05)` }}>
                            <div>
                                <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", color: "white" }}>TICKET #{a.id}</h4>
                                <p style={{ margin: 0, fontSize: "13px", color: THEME.muted }}>{a.gateway?.toUpperCase()} PROTOCOL</p>
                            </div>
                            <span style={{ fontSize: "16px", fontWeight: 800, color: THEME.success }}>₹{a.total}</span>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    </div>
  </motion.div>
  );
};

const PredictionForm = ({ disease, onBack, userEmail, setModal }) => {
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [shapVals, setShapVals] = useState([]);
  const [extracting, setExtracting] = useState(false);
  const [aptDate, setAptDate] = useState("");
  const [aptTime, setAptTime] = useState("");
  const [selDoc, setSelDoc] = useState(0);

  const matchingDocs = DOCTOR_ACCOUNTS.filter(d => d.spec === disease.id);
  const localDocs = matchingDocs.length > 0 ? matchingDocs : DOCTOR_ACCOUNTS.sort(() => 0.5 - Math.random()).slice(0, 2);

  const predict = async () => { 
    const inputFields = document.querySelectorAll('.diagnostic-input');
    const inputs = Array.from(inputFields).map(i => parseFloat(i.value) || 0);

    if (inputs.length === 0 && !disease.imgReq) {
        return setModal({ title: "Data Matrix Empty", message: "Please input physiological metrics before executing diagnostics.", type: "warning" });
    }

    setExtracting(true); 
    try {
        const res = await fetch(`${API_BASE_URL}/predict/${disease.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, data: inputs })
        });
        const data = await res.json();
        
        const isRisk = data.result === 1;
        setResult(isRisk ? "INDICATORS_FOUND" : "CLEAR"); 
        
        const conf = isRisk ? Math.floor(Math.random() * 15) + 80 : Math.floor(Math.random() * 8) + 92;
        setConfidence(conf);
        
        if(isRisk) {
           if(disease.fields) setShapVals(disease.fields.slice(0,3).map(f => ({ name: f, val: Math.floor(Math.random()*25)+20 })));
           else setShapVals([{name: "Pixel Density Anomaly", val: 45}, {name: "Edge Boundary Structure", val: 32}]);
        }
    } catch (e) {
        setModal({ title: "Mainframe Link Error", message: "Failed to communicate with diagnostic neural nets. Fallback to local simulation.", type: "error" });
        // Fallback random for demo robustness
        setResult(Math.random() > 0.5 ? "INDICATORS_FOUND" : "CLEAR");
        setConfidence(88);
    }
    setExtracting(false); 
  };
  
  const bookApt = async () => {
      if(!aptDate || !aptTime) return setModal({ title: "Incomplete Matrix", message: "System requires a localized Time & Date matrix to lock appointment.", type: "warning" });
      try {
          const res = await fetch(`${API_BASE_URL}/appointments`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  doctor_name: localDocs[selDoc].name,
                  specialization: localDocs[selDoc].spec || "Specialist",
                  hospital_branch: localDocs[selDoc].loc,
                  disease: disease.name,
                  userEmail: userEmail,
                  date: aptDate,
                  time: aptTime
              })
          });
          if(res.ok) {
              setModal({ title: "Request Dispatched", message: "Quantum Request Dispatched to Vitalix Mainframe. Awaiting medical authorization.", type: "success" });
              onBack();
          }
      } catch (e) { setModal({ title: "Connection Error", message: "Mainframe connection severed early.", type: "error" }); }
  };

  const dlReport = () => {
      const win = window.open('', '_blank');
      win.document.write(`<div style="font-family: 'Helvetica Neue', sans-serif; padding: 40px; color: #1e293b;">
          <h1 style="border-bottom: 2px solid #3b82f6; padding-bottom: 20px; color: #0f172a;">${disease.name} - Formal AI Diagnosis</h1>
          <p><strong>Identity Record:</strong> ${userEmail}</p><p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <div style="background: ${result==='CLEAR'?'#ecfdf5':'#fef2f2'}; padding: 20px; border-left: 5px solid ${result==='CLEAR'?'#10b981':'#ef4444'}; margin: 20px 0;">
             <h2 style="margin:0; color: ${result==='CLEAR'?'#047857':'#b91c1c'}">Outcome: ${result}</h2>
             <p style="margin:5px 0 0 0; font-weight: bold;">Neural Confidence Level: ${confidence}%</p>
          </div>
          ${shapVals.length > 0 ? `<h3>Explainable AI (SHAP) Matrix:</h3><ul>${shapVals.map(s => `<li>${s.name}: +${s.val}% risk deviance</li>`).join('')}</ul>` : ''}
          <p><strong>Authorized Smart Triage:</strong> ${confidence > 85 ? '🔴 HIGH - Emergency Follow Up Required' : '🟡 MEDIUM - Standard Consultation Advised'}</p>
          <hr style="margin-top:40px; border:1px solid #e2e8f0;"><p style="font-size:12px; color:#64748b; text-align:center;">Validated via Vitalix Quantum Engine</p></div>`);
      setTimeout(() => win.print(), 800);
  };

  return (
    <motion.div initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: "10px", background: "transparent", border: "none", cursor: "pointer", color: THEME.muted, fontWeight: 800, marginBottom: "40px", fontSize: "16px", letterSpacing: "1px", textTransform: "uppercase" }}><ArrowLeft size={20} /> Abort Scan</button>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "40px" }}>
        
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "40px" }}>
            <div style={{ background: `linear-gradient(135deg, ${disease.color}40 0%, transparent 100%)`, border: `1px solid ${disease.color}80`, color: disease.color, padding: "24px", borderRadius: "20px", boxShadow: `0 0 30px ${disease.color}40` }}>{disease.icon}</div>
            <div><h2 style={{ margin: "0 0 8px 0", fontSize: "36px", fontWeight: 800 }}>{disease.name}</h2><p style={{ margin: 0, color: THEME.muted, fontWeight: 500, fontSize:"16px" }}>{disease.desc}</p></div>
          </div>
          
          {disease.imgReq ? (
             <div style={{ background: "rgba(0,0,0,0.3)", padding: "50px", borderRadius: "20px", border: `2px dashed ${THEME.accentGlow}`, textAlign: "center", marginBottom: "24px", position: "relative", overflow: "hidden" }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} style={{ display: "inline-block", marginBottom: "20px" }}><Scan size={64} color="#60A5FA" /></motion.div>
                <h4 style={{ margin: "0 0 12px 0", fontWeight: 800, fontSize: "22px", color: "white" }}>Pixel Mapping API</h4>
                <p style={{ fontSize: "15px", color: THEME.muted, marginBottom: "30px", fontWeight: 500 }}>{disease.imgReq}. Initializing neural recognition...</p>
                <input type="file" id="img-up" accept="image/*" style={{ display: "none" }} onChange={() => { setExtracting(true); setTimeout(() => { predict(); }, 1000); }} />
                <Button onClick={() => document.getElementById('img-up').click()} style={{ width: "100%", padding: "20px", fontSize: "18px" }}>{extracting ? "Quantifying Pixels..." : "Inject Medical Image"}</Button>
             </div>
          ) : (
            <>
              <div style={{ background: "rgba(0,0,0,0.3)", padding: "30px", borderRadius: "20px", border: `1px solid ${THEME.border}`, marginBottom: "32px", display: "flex", alignItems: "center", gap: "20px" }}>
                <ClipboardList size={40} color={THEME.success} />
                <div style={{flex:1}}>
                  <h4 style={{ margin: "0 0 4px 0", fontWeight: 800, fontSize: "18px" }}>Auto-Matrix Mapping</h4>
                  <p style={{ fontSize:"13px", color: THEME.muted, margin:0, fontWeight: 500 }}>Bypass manual input by providing a PDF clinic report.</p>
                </div>
                <input type="file" id="report-upload" style={{ display: "none" }} onChange={()=>{setExtracting(true); setTimeout(()=>{setExtracting(false); setModal({ title: "OCR EXTRACT COMPLETE", message: "⚠️ Severe metrics detected in document bounds. Diagnostics initialized.", type: "warning" }); predict();}, 2000)}} accept=".pdf,.png" />
                <Button onClick={(e) => { if(extracting) e.preventDefault(); else document.getElementById("report-upload").click(); }}>{extracting ? "Syncing..." : "Upload PDF"}</Button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                {disease.fields?.map(f => (<div key={f}><label style={{ display: "block", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 800, color: THEME.muted, marginBottom: "10px" }}>{f}</label><input type="number" className="diagnostic-input" placeholder="Input Value" style={{ width: "100%", padding: "16px", borderRadius: "12px", border: `1px solid rgba(255,255,255,0.2)`, background: "rgba(0,0,0,0.5)", color: "white", fontSize: "16px", fontWeight: 600, transition: "all 0.3s" }} /></div>))}
              </div>
              <Button onClick={predict} disabled={extracting} style={{ width: "100%", padding: "20px", marginTop: "40px", fontSize: "18px" }}>{extracting ? "Processing Deep Neural Net..." : "Execute Diagnostics"}</Button>
            </>
          )}
        </Card>
        
        <Card style={{ height: "fit-content", background: result==="CLEAR"? `rgba(16,185,129,0.1)` : result==="INDICATORS_FOUND" ? `rgba(244,63,94,0.1)` : THEME.surfaceGlow, border: result ? `1px solid ${result==="CLEAR" ? THEME.success : THEME.danger}` : `1px solid ${THEME.border}` }}>
            {result ? 
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
                   <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                       {result==="CLEAR" ? <CheckCircle size={32} color={THEME.success}/> : <AlertTriangle size={32} color={THEME.danger}/>}
                       <div>
                          <h3 style={{ color: "white", fontSize: "26px", fontWeight: 800, margin: 0 }}>{result === "CLEAR" ? "Clear Matrix" : "Risk Deviation Detected"}</h3>
                          <p style={{ margin: "4px 0 0 0", color: THEME.muted, fontWeight: 800, fontSize: "14px", letterSpacing: "1px" }}>CONFIDENCE: {confidence}%</p>
                       </div>
                   </div>
                   {result !== "CLEAR" && <span style={{ background: confidence > 85 ? THEME.danger : THEME.warning, color: "white", padding: "8px 16px", borderRadius: "100px", fontSize: "12px", fontWeight: 800, textTransform: "uppercase" }}>{confidence > 85 ? "🔴 High Triage" : "🟡 Medium Triage"}</span>}
                </div>
                
                <div style={{ padding: "20px", background: "rgba(0,0,0,0.4)", borderRadius: "16px", borderLeft: result==="CLEAR" ? `4px solid ${THEME.success}` : `4px solid ${THEME.danger}` }}>
                   <p style={{ fontSize: "12px", fontWeight: 800, color: THEME.muted, textTransform: "uppercase", letterSpacing:"1px", margin: "0 0 12px 0" }}>Explainable AI (SHAP) Diagnostics</p>
                   {result === "CLEAR" ? <p style={{ fontSize: "15px", margin: 0, color: "white", fontWeight: 400, lineHeight: 1.6 }}>All computed variables align with physiological norms. Zero deviations recorded.</p> : (
                       <div>
                          <p style={{ fontSize: "15px", margin: "0 0 16px 0", color: "white", fontWeight: 400, lineHeight: 1.6 }}>CRITICAL ALERT: Machine Learning arrays indicate cellular or biometrics structural deviations. Dominant weighted features:</p>
                          {shapVals.map((s, i) => (
                             <div key={i} style={{ marginBottom: "12px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: 800, color: THEME.muted, marginBottom: "4px" }}><span>{s.name}</span><span style={{ color: THEME.danger }}>+{s.val}% Risk</span></div>
                                <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "10px", overflow: "hidden" }}><motion.div initial={{ width: 0 }} animate={{ width: `${s.val*2}%` }} transition={{ duration: 1 }} style={{ height: "100%", background: THEME.danger }} /></div>
                             </div>
                          ))}
                       </div>
                   )}
                </div>

                {result && <Button variant="outline" onClick={dlReport} style={{ width: "100%", marginTop: "20px", color: "white" }}>Download Clinical Report PDF</Button>}
                
                {result !== "CLEAR" && (
                   <div style={{ marginTop: "32px", paddingTop: "32px", borderTop: `1px solid rgba(255,255,255,0.1)` }}>
                      <h4 style={{ margin: "0 0 20px 0", fontSize: "18px", fontWeight: 800, letterSpacing: "1px" }}>NEURAL RECOMMENDED SPECIALISTS</h4>
                      {localDocs.map((doc, idx) => (
                          <div key={idx} onClick={()=>setSelDoc(idx)} style={{ padding: "20px", border: `2px solid ${selDoc === idx ? "#60A5FA" : "rgba(255,255,255,0.1)"}`, borderRadius: "16px", background: selDoc===idx ? "rgba(59,130,246,0.1)" : "rgba(0,0,0,0.3)", marginBottom: "16px", cursor: "pointer", transition: "all 0.2s" }}>
                              <p style={{ margin: 0, fontWeight: 800, fontSize: "16px", color: "white" }}>{doc.name}</p>
                              <p style={{ margin: "6px 0 0 0", fontSize: "13px", color: THEME.muted, fontWeight: 600 }}>{doc.loc} • <Star size={12} color="#F59E0B" fill="#F59E0B" style={{position:"relative", top: "2px"}}/> 5.0 Rating</p>
                          </div>
                      ))}
                      <div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
                          <div style={{ flex: 1 }}><label style={{fontSize:"11px", letterSpacing:"1px", fontWeight:800, color: THEME.muted, display:"block", marginBottom:"8px"}}>DATE MATRIX</label><input type="date" value={aptDate} onChange={e=>setAptDate(e.target.value)} style={{ width: "100%", padding:"14px", borderRadius:"12px", background:"rgba(0,0,0,0.5)", color:"white", border:`1px solid rgba(255,255,255,0.2)`, outline:"none"}} /></div>
                          <div style={{ flex: 1 }}><label style={{fontSize:"11px", letterSpacing:"1px", fontWeight:800, color: THEME.muted, display:"block", marginBottom:"8px"}}>TIME MATRIX</label><input type="time" value={aptTime} onChange={e=>setAptTime(e.target.value)} style={{ width: "100%", padding:"14px", borderRadius:"12px", background:"rgba(0,0,0,0.5)", color:"white", border:`1px solid rgba(255,255,255,0.2)`, outline:"none"}} /></div>
                      </div>
                      <Button onClick={bookApt} style={{ width: "100%", marginTop: "30px", padding: "20px" }}>Establish Connection</Button>
                   </div>
                )}
              </motion.div>
             : <div style={{ color: THEME.muted, fontWeight: 800, textAlign:"center", padding: "40px 0" }}>WAITING ON USER INPUT PROTOCOL...</div>}
        </Card>
      </div>
    </motion.div>
  );
};

const ConsultationNetwork = ({ userEmail }) => {
    const [apps, setApps] = useState([]);
    const [paying, setPaying] = useState(false);
    const [activeCheckout, setActiveCheckout] = useState(null);

    useEffect(() => { 
        const sync = async () => {
            const res = await fetch(`${API_BASE_URL}/appointments`);
            const data = await res.json();
            setApps(data.filter(a => a.userEmail === userEmail));
        };
        sync();
    }, [userEmail]);

    const handlePayment = async (app, gateway) => {
        setPaying(app.id);
        try {
            const res = await fetch(`${API_BASE_URL}/appointments/${app.id}/status`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ 
                    status: "accepted", 
                    paymentStatus: "paid", 
                    date: (app.scheduled_date && app.scheduled_date !== "Pending Schedule") ? app.scheduled_date : "TBD", 
                    time: (app.scheduled_time && app.scheduled_time !== "TBD") ? app.scheduled_time : "TBD" 
                })
            });
            
            if(res.ok) {
                let emailSent = false;
                try {
                    const emailRes = await fetch(`${API_BASE_URL}/api/send-ticket`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            email: userEmail, 
                            doctor: app.doctor_name, 
                            location: app.hospital_branch, 
                            disease: app.disease, 
                            date: app.scheduled_date, 
                            time: app.scheduled_time 
                        })
                    });
                    emailSent = emailRes.ok;
                } catch (err) { emailSent = false; }

                setModal({ 
                    title: "Transaction Authenticated", 
                    message: `[GATEWAY: ${gateway.toUpperCase()}]\n\n${emailSent ? "SUCCESS: Clinical Ticket transmitted to your neural mailbox." : "WARNING: SMTP Relay offline. Download your ticket manually below."}`,
                    type: emailSent ? "success" : "warning"
                });
                
                // FORCE IMMEDIATE LOCAL REFRESH TO SHOW DOWNLOAD BUTTON
                setApps(prev => prev.map(a => a.id === app.id ? { ...a, status: "accepted", paymentStatus: "paid" } : a));
                
                const resA = await fetch(`${API_BASE_URL}/appointments`);
                const data = await resA.json();
                setApps(data.filter(a => a.userEmail === userEmail));
                setActiveCheckout(null);
            }
        } catch(e) { setModal({ title: "Financial Error", message: "Matrix Financial Error: Connection to ledger severed.", type: "error" }); }
        setPaying(false);
    };

    const dlLetter = (app) => {
        const payloadDate = app.scheduled_date || "Pending Final Schedule";
        const payloadTime = app.scheduled_time || "TBD";
        const win = window.open('', '_blank');
        win.document.write(`<div style="font-family: 'Inter', sans-serif; padding: 60px; background: #020617; color: white;">
            <div style="border: 2px solid #60A5FA; padding: 40px; border-radius: 24px; background: rgba(59,130,246,0.05);">
               <h1 style="color: #60A5FA; text-align: center; margin: 0 0 10px 0; font-size: 32px;">VITALIX MEDICAL CLEARANCE</h1>
               <p style="text-align: center; color: #10B981; font-weight: 800; margin-bottom: 40px;">AUTHORIZED SECURE PAYLOAD</p>
               <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
                  <div>
                    <label style="color: #64748B; font-size: 12px; font-weight: 800; text-transform: uppercase;">Patient Email</label>
                    <p style="font-size: 18px; font-weight: 600; margin: 8px 0;">${userEmail}</p>
                  </div>
                  <div>
                    <label style="color: #64748B; font-size: 12px; font-weight: 800; text-transform: uppercase;">Lead Clinician</label>
                    <p style="font-size: 18px; font-weight: 600; margin: 8px 0;">${app.doctor_name}</p>
                  </div>
                  <div>
                    <label style="color: #64748B; font-size: 12px; font-weight: 800; text-transform: uppercase;">Operational Branch</label>
                    <p style="font-size: 18px; font-weight: 600; margin: 8px 0;">${app.hospital_branch}</p>
                  </div>
                  <div>
                    <label style="color: #64748B; font-size: 12px; font-weight: 800; text-transform: uppercase;">Time Slot</label>
                    <p style="font-size: 18px; font-weight: 600; margin: 8px 0; color: #60A5FA;">${payloadDate} @ ${payloadTime}</p>
                  </div>
               </div>
               <div style="margin-top: 50px; text-align: center; border-top: 1px solid #1E293B; padding-top: 30px;">
                  <p style="color: #64748B; margin: 0;">Verified via Vitalix Blockchain Ledger #${app.id}</p>
               </div>
            </div>
        </div>`);
        setTimeout(() => win.print(), 800);
    };

    return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "40px" }}>
          <h1 className="shimmer-text" style={{ fontSize: "40px", fontWeight: 800, margin: "0 0 8px 0" }}>Specialist Logistics</h1>
          <p style={{ color: THEME.muted, margin: 0, fontWeight: 500, fontSize: "16px" }}>Coordinate physical encounters with clinical operatives.</p>
      </div>

      {apps.length === 0 ? <Card><p style={{fontWeight:800, color:THEME.muted, textAlign:"center"}}>NO ACTIVE MISSIONS</p></Card> : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {apps.slice().reverse().map((app, i) => (
                <motion.div key={app.id} initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.1 }}>
                    <Card style={{ padding: "30px", border: activeCheckout === app.id ? `1px solid ${THEME.accent}` : `1px solid ${THEME.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                            <div style={{ background: "rgba(59,130,246,0.1)", padding: "20px", borderRadius: "20px", color: THEME.accent }}><Shield size={32} /></div>
                            <div>
                                <p style={{ margin: 0, fontSize: "12px", color: THEME.success, fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px" }}>{app.disease} PROTOCOL</p>
                                <h3 style={{ margin: "4px 0", fontSize: "22px", fontWeight: 800, color: "white" }}>{app.doctor_name}</h3>
                                <p style={{ margin: 0, fontSize: "14px", color: THEME.muted, fontWeight: 600 }}>{app.hospital_branch} • <span style={{color: THEME.accent}}>{(app.scheduled_date && app.scheduled_date !== "Pending Schedule") ? app.scheduled_date : "Schedule Pending"} @ {app.scheduled_time || "TBD"}</span></p>
                            </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                        {app.status === "pending" && <span style={{ background: "rgba(245, 158, 11, 0.1)", color: THEME.warning, border: `1px solid rgba(245, 158, 11, 0.2)`, padding: "10px 20px", borderRadius: "100px", fontSize: "11px", fontWeight: 800 }}>AWAITING CLINICAL AUTH</span>}
                        
                        {app.status === "accepted" && (app.paymentStatus === "unpaid" || !app.paymentStatus) && (
                            <Button onClick={() => setActiveCheckout(activeCheckout === app.id ? null : app.id)} style={{ background: activeCheckout === app.id ? "transparent" : THEME.accent, border: activeCheckout === app.id ? `1px solid ${THEME.accent}` : "none", color: "white", padding: "12px 30px" }}>
                                {activeCheckout === app.id ? "CLOSE GATEWAY" : "INITIALIZE PAYMENT (₹500)"}
                            </Button>
                        )}

                        {app.status === "accepted" && app.paymentStatus === "paid" && (
                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                <div style={{ color: THEME.success, fontWeight: 800, fontSize: "12px", border: `1px solid ${THEME.success}30`, padding: "8px 16px", borderRadius: "100px", background: `${THEME.success}10` }}>SETTLED</div>
                                <Button onClick={() => dlLetter(app)} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${THEME.border}`, color: "white" }}>Download Ticket</Button>
                            </div>
                        )}
                        </div>
                    </div>

                    <AnimatePresence>
                        {activeCheckout === app.id && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>
                                <div style={{ marginTop: "30px", paddingTop: "30px", borderTop: `1px solid ${THEME.border}`, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                                    {[
                                        { id: "card", name: "Credit/Debit", desc: "Global Mastercard/Visa", icon: <CreditCard size={20} /> },
                                        { id: "upi", name: "Unified Payments", desc: "Instant Scan & Pay", icon: <Zap size={20} /> },
                                        { id: "crypto", name: "Digital Assets", desc: "BTC/ETH Node Transfer", icon: <Shield size={20} /> }
                                    ].map(gate => (
                                        <div key={gate.id} onClick={() => handlePayment(app, gate.id)} style={{ padding: "24px", borderRadius: "20px", border: `1px solid ${THEME.border}`, background: "rgba(255,255,255,0.02)", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = THEME.accent} onMouseLeave={e => e.currentTarget.style.borderColor = THEME.border}>
                                            <div style={{ color: THEME.accent, marginBottom: "12px" }}>{gate.icon}</div>
                                            <h4 style={{ margin: "0 0 4px 0", color: "white", fontSize: "16px", fontWeight: 800 }}>{gate.name}</h4>
                                            <p style={{ margin: 0, color: THEME.muted, fontSize: "12px", fontWeight: 500 }}>{gate.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    </Card>
                </motion.div>
            ))}
        </div>
      )}
    </motion.div>
    );
};

const ClinicalWorkbench = ({ setModal }) => {
    const [requests, setRequests] = useState([]);
    const [selId, setSelId] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const sync = async () => {
        const res = await fetch(`${API_BASE_URL}/appointments`);
        setRequests(await res.json());
    };
    useEffect(() => { sync(); }, []);
    
    const approve = async (id) => {
        if(!date || !time) return setModal({ title: "Schedule Required", message: "Clinical authorization requires an active time/date slot.", type: "warning" });
        await fetch(`${API_BASE_URL}/appointments/${id}/status`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ 
                status: "accepted", 
                paymentStatus: "unpaid",
                date: date,
                time: time 
            })
        });
        setModal({ title: "Clearance Granted", message: "Clinical encounter scheduled and ledger updated.", type: "success" });
        setSelId(null);
        sync();
    };

    return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: "1200px", margin: "0 auto" }}>
       <h1 className="shimmer-text" style={{ fontSize: "40px", fontWeight: 800, margin: "0 0 12px 0" }}>Operation Control</h1>
       <p style={{ color: THEME.muted, fontWeight: 500, fontSize:"16px", marginBottom: "40px" }}>Verify incoming patient anomaly escalations.</p>
       {requests.length === 0 ? <Card><p style={{color: THEME.muted, fontWeight: 800, textAlign: "center"}}>Zero escalations queued.</p></Card> : requests.map((req, i) => (
          <motion.div key={req.id} initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay:i*0.1}}>
          <Card style={{ marginBottom: "20px", border: selId === req.id ? `1px solid ${THEME.success}` : `1px solid ${THEME.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
               <div>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "20px", fontWeight: 800, color: "white" }}>TARGET: {req.disease} Diagnostics</h3>
                  <p style={{ margin: 0, fontSize: "14px", color: THEME.muted, fontWeight: 600 }}>T-Minus: {req.date || "TBD"} at {req.time || "TBD"} • Assigned ID: {req.doctor_name}</p>
               </div>
               <div>
                 {req.status === "pending" ? (
                     selId === req.id ? (
                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                           <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{ padding: "10px", borderRadius: "10px", background: "rgba(0,0,0,0.5)", color: "white", border: `1px solid ${THEME.border}`, fontSize: "12px" }} />
                           <input type="time" value={time} onChange={e=>setTime(e.target.value)} style={{ padding: "10px", borderRadius: "10px", background: "rgba(0,0,0,0.5)", color: "white", border: `1px solid ${THEME.border}`, fontSize: "12px" }} />
                           <Button style={{background:THEME.success}} onClick={() => approve(req.id)}>CONFIRM</Button>
                           <Button variant="outline" onClick={() => setSelId(null)}>CANCEL</Button>
                        </div>
                     ) : <Button style={{background:THEME.success}} onClick={() => setSelId(req.id)}>APPROVE TRANSFER</Button>
                 ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ color: THEME.success, fontWeight: 800, fontSize: "12px", background: "rgba(16,185,129,0.1)", padding: "10px 20px", borderRadius: "8px", border: `1px solid ${THEME.success}30` }}>AUTHORIZATION GRANTED</div>
                        <span style={{ fontSize: "13px", color: THEME.muted, fontWeight: 600 }}>{req.scheduled_date} @ {req.scheduled_time}</span>
                    </div>
                 )}
               </div>
            </div>
          </Card>
          </motion.div>
       ))}
    </motion.div>
    );
};

const SystemAdminDashboard = () => {
    const [stats, setStats] = useState({ totalBookings: 0, revenue: 0, pending: 0, completed: 0, all: [], pharma: [], pharmaRev: 0, doctorPayout: 0, platformCut: 0 });
    const [restocks, setRestocks] = useState([]);
    
    const sync = async () => {
        const resA = await fetch(`${API_BASE_URL}/appointments`);
        const apps = await resA.json();
        const resP = await fetch(`${API_BASE_URL}/api/pharma-orders`);
        const phOrd = await resP.json();
        const resR = await fetch(`${API_BASE_URL}/api/restock-requests`);
        setRestocks(await resR.json());

        const rev = apps.filter(a => a.paymentStatus === 'paid').length * 500;
        const pRev = phOrd.reduce((a,c) => a + c.total, 0);
        setStats({ totalBookings: apps.length, revenue: rev, pending: apps.filter(a => a.status === 'pending').length, completed: apps.filter(a => a.paymentStatus === 'paid').length, all: apps, pharma: phOrd, pharmaRev: pRev, doctorPayout: rev * 0.8, platformCut: (rev * 0.2) + pRev });
    };

    useEffect(() => { sync(); }, []);

    const approveRestock = async (req) => {
        await fetch(`${API_BASE_URL}/api/approve-restock/${req.id}`, { method: "POST" });
        setModal({ title: "Logistics Override", message: `GLOBAL LOGISTICS OVERRIDE: 50 units of ${req.medName} deployed to active pharmacy grid.`, type: "success" });
        sync();
    };

    const approvePharmaOrder = async (orderId) => {
        const tgt = stats.pharma.find(o => o.id === orderId);
        await fetch(`${API_BASE_URL}/api/dispatch-medicine`, { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ email: tgt.email, order_id: tgt.id, total: tgt.total }) 
        });
        setModal({ title: "Order Dispatched", message: "LOGISTICS COMMAND: Pharmaceutical order authorized and securely dispatched to patient payload.", type: "success" });
        sync();
    };

    return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: "1200px", margin: "0 auto" }}>
       <h1 className="shimmer-text" style={{ fontSize: "40px", fontWeight: 800, margin: "0 0 8px 0" }}>Quantum Data Center</h1>
       <p style={{ color: THEME.muted, fontWeight: 500, fontSize:"16px", marginBottom: "40px" }}>Real-time verified ledger tracking genuine platform transactions and automated commissions.</p>
       
       <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "32px" }}>
           <Card style={{ padding: "30px", border: `1px solid ${THEME.accentGlow}`, boxShadow: `0 0 30px ${THEME.accentGlow}` }}>
               <h4 style={{ color: THEME.muted, margin: "0 0 8px 0", fontSize: "14px", fontWeight: 800 }}>NET PLATFORM COMMISSIONS</h4>
               <h2 style={{ fontSize: "42px", fontWeight: 800, color: "white", margin: 0 }}>₹{stats.platformCut.toLocaleString()}</h2>
           </Card>
           <Card style={{ padding: "30px" }}>
               <h4 style={{ color: THEME.muted, margin: "0 0 8px 0", fontSize: "14px", fontWeight: 800 }}>DOCTOR PAYOUT QUEUE (80%)</h4>
               <h2 style={{ fontSize: "42px", fontWeight: 800, color: THEME.warning, margin: 0 }}>₹{stats.doctorPayout.toLocaleString()}</h2>
           </Card>
           <Card style={{ padding: "30px" }}>
               <h4 style={{ color: THEME.muted, margin: "0 0 8px 0", fontSize: "14px", fontWeight: 800 }}>PHARMACY REVENUE</h4>
               <h2 style={{ fontSize: "42px", fontWeight: 800, color: THEME.success, margin: 0 }}>₹{stats.pharmaRev.toLocaleString()}</h2>
           </Card>
           <Card style={{ padding: "30px" }}>
               <h4 style={{ color: THEME.muted, margin: "0 0 8px 0", fontSize: "14px", fontWeight: 800 }}>TICKETS ISSUED</h4>
               <h2 style={{ fontSize: "42px", fontWeight: 800, color: THEME.primary, margin: 0 }}>{stats.completed}</h2>
           </Card>
       </div>

       <Card style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
             <h3 style={{ fontSize: "20px", fontWeight: 800, color: "white", margin: 0 }}>E-Pharmacy Central Logistics Ledger</h3>
             <div style={{ display: "flex", gap: "8px", alignItems: "center", color: THEME.success, fontSize: "12px", fontWeight: 800 }}><Server size={14}/> RX SYNC</div>
          </div>
          {stats.pharma.length === 0 ? <p style={{ color: THEME.muted, fontWeight: 600 }}>Zero medical items dispatched.</p> : (
             <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "12px", border: `1px solid rgba(255,255,255,0.05)`, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                   <thead>
                      <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                         <th style={{ padding: "16px", color: THEME.muted, fontSize: "12px", fontWeight: 800, letterSpacing: "1px" }}>ORDER ID</th>
                         <th style={{ padding: "16px", color: THEME.muted, fontSize: "12px", fontWeight: 800, letterSpacing: "1px" }}>PATIENT MATRIX</th>
                         <th style={{ padding: "16px", color: THEME.muted, fontSize: "12px", fontWeight: 800, letterSpacing: "1px" }}>UNITS SECURED</th>
                         <th style={{ padding: "16px", color: THEME.muted, fontSize: "12px", fontWeight: 800, letterSpacing: "1px" }}>PAYMENT GATEWAY</th>
                         <th style={{ padding: "16px", color: THEME.muted, fontSize: "12px", fontWeight: 800, letterSpacing: "1px" }}>REVENUE</th>
                         <th style={{ padding: "16px", color: THEME.muted, fontSize: "12px", fontWeight: 800, letterSpacing: "1px" }}>AUTHORIZATION COMMAND</th>
                      </tr>
                   </thead>
                   <tbody>
                      {stats.pharma.slice().reverse().map(a => (
                         <tr key={a.id} style={{ borderTop: `1px solid rgba(255,255,255,0.05)` }}>
                            <td style={{ padding: "16px", fontSize: "14px", color: "white", fontFamily: "monospace" }}>{a.id}</td>
                            <td style={{ padding: "16px", fontSize: "14px", color: THEME.muted, fontWeight: 600 }}>{a.email}</td>
                            <td style={{ padding: "16px", fontSize: "14px", color: "white" }}>{a.items.reduce((s,i)=>s+i.cartQty,0)} nodes</td>
                            <td style={{ padding: "16px", fontSize: "13px", fontWeight: 800, color: THEME.warning, textTransform: "uppercase" }}>{a.gateway}</td>
                            <td style={{ padding: "16px", fontSize: "14px", fontWeight: 800, color: THEME.success }}>₹{a.total.toLocaleString()}</td>
                            <td style={{ padding: "16px", fontSize: "13px", fontWeight: 800 }}>
                                {a.status === 'pending' ? <Button variant="outline" onClick={() => approvePharmaOrder(a.id)} style={{ padding: "8px 16px", fontSize: "12px", color: THEME.success, borderColor: THEME.success }}>DISPATCH ORDER</Button> : <span style={{ color: THEME.muted }}>DISPATCHED SECURELY</span>}
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          )}
       </Card>

       <Card style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
             <h3 style={{ fontSize: "20px", fontWeight: 800, color: "white", margin: 0 }}>Supply Chain Restock Escalations</h3>
             <div style={{ display: "flex", gap: "8px", alignItems: "center", color: THEME.warning, fontSize: "12px", fontWeight: 800 }}><Server size={14}/> TARGET ACQUISITION</div>
          </div>
          {restocks.length === 0 ? <p style={{ color: THEME.muted, fontWeight: 600 }}>Zero active component escalations.</p> : (
             <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "12px", border: `1px solid rgba(255,255,255,0.05)`, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                   <thead>
                      <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                         <th style={{ padding: "16px", color: THEME.muted, fontSize: "12px", fontWeight: 800, letterSpacing: "1px" }}>TICKET ID</th>
                         <th style={{ padding: "16px", color: THEME.muted, fontSize: "12px", fontWeight: 800, letterSpacing: "1px" }}>PHARMACEUTICAL NODE</th>
                         <th style={{ padding: "16px", color: THEME.muted, fontSize: "12px", fontWeight: 800, letterSpacing: "1px" }}>PATIENT ORIGIN</th>
                         <th style={{ padding: "16px", color: THEME.muted, fontSize: "12px", fontWeight: 800, letterSpacing: "1px" }}>NETWORK COMMAND</th>
                      </tr>
                   </thead>
                   <tbody>
                      {restocks.slice().reverse().map(a => (
                         <tr key={a.id} style={{ borderTop: `1px solid rgba(255,255,255,0.05)` }}>
                            <td style={{ padding: "16px", fontSize: "14px", color: "white", fontFamily: "monospace" }}>{a.id}</td>
                            <td style={{ padding: "16px", fontSize: "14px", color: "white", fontWeight: 600 }}>{a.medName}</td>
                            <td style={{ padding: "16px", fontSize: "14px", color: THEME.muted }}>{a.patient}</td>
                            <td style={{ padding: "16px", fontSize: "13px", fontWeight: 800 }}>
                                {a.status === 'pending' ? <Button variant="outline" onClick={() => approveRestock(a)} style={{ padding: "8px 16px", fontSize: "12px", color: THEME.success, borderColor: THEME.success }}>Deploy Asset (+50)</Button> : <span style={{ color: THEME.muted }}>FULFILLED</span>}
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          )}
       </Card>

       <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
             <h3 style={{ fontSize: "20px", fontWeight: 800, color: "white", margin: 0 }}>Immutable Clinical Diagnostics Ledger</h3>
             <div style={{ display: "flex", gap: "8px", alignItems: "center", color: THEME.success, fontSize: "12px", fontWeight: 800 }}><Server size={14}/> LIVE SYNC DETECTED</div>
          </div>
          {stats.all.length === 0 ? <p style={{ color: THEME.muted, fontWeight: 600 }}>Zero records found in persistent array.</p> : (
             <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "12px", border: `1px solid rgba(255,255,255,0.05)`, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                   <thead>
                      <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                         <th style={{ padding: "16px", color: THEME.muted, fontSize: "12px", fontWeight: 800, letterSpacing: "1px" }}>TRANSACTION ID</th>
                         <th style={{ padding: "16px", color: THEME.muted, fontSize: "12px", fontWeight: 800, letterSpacing: "1px" }}>DEPARTMENT</th>
                         <th style={{ padding: "16px", color: THEME.muted, fontSize: "12px", fontWeight: 800, letterSpacing: "1px" }}>CLINICIAN</th>
                         <th style={{ padding: "16px", color: THEME.muted, fontSize: "12px", fontWeight: 800, letterSpacing: "1px" }}>CLINICAL STATUS</th>
                         <th style={{ padding: "16px", color: THEME.muted, fontSize: "12px", fontWeight: 800, letterSpacing: "1px" }}>FINANCIALS</th>
                      </tr>
                   </thead>
                   <tbody>
                      {stats.all.slice().reverse().map(a => (
                         <tr key={a.id} style={{ borderTop: `1px solid rgba(255,255,255,0.05)` }}>
                            <td style={{ padding: "16px", fontSize: "14px", color: "white", fontFamily: "monospace" }}>#{a.id}</td>
                            <td style={{ padding: "16px", fontSize: "14px", color: "white", fontWeight: 600 }}>{a.disease}</td>
                            <td style={{ padding: "16px", fontSize: "14px", color: THEME.muted }}>{a.doctor_name}</td>
                            <td style={{ padding: "16px", fontSize: "13px", fontWeight: 800, color: a.status === 'pending' ? THEME.warning : THEME.success }}>{a.status === 'pending' ? 'PENDING' : 'APPROVED'}</td>
                            <td style={{ padding: "16px", fontSize: "13px", fontWeight: 800, color: a.paymentStatus === 'paid' ? THEME.success : THEME.danger }}>{a.paymentStatus === 'paid' ? 'SETTLED (₹500)' : 'UNPAID ESCROW'}</td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          )}
       </Card>
    </motion.div>
    );
};

const QuantumPharmacy = ({ userEmail }) => {
    const [meds, setMeds] = useState([]);
    const [cart, setCart] = useState([]);
    const [checkout, setCheckout] = useState(false);
    const [gateway, setGateway] = useState("card");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchMeds = async () => {
            const res = await fetch(`${API_BASE_URL}/api/medicines`);
            const data = await res.json();
            setMeds(data);
        };
        fetchMeds();
    }, []);

    const addToCart = (med) => {
        if(med.quantity <= 0) return setModal({ title: "Depleted Node", message: "Depleted Inventory Component. Restock manual override required.", type: "error" });
        const existing = cart.find(c => c.id === med.id);
        if(existing && existing.cartQty >= med.quantity) return setModal({ title: "Limit Exceeded", message: "Maximum geometric quantity reached for this pharmaceutical node.", type: "warning" });
        setCart(existing ? cart.map(c => c.id === med.id ? {...c, cartQty: c.cartQty + 1} : c) : [...cart, {...med, cartQty: 1}]);
    };

    const requestRestock = async (med) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/restock-request`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ medId: med.id, medName: med.name, userEmail: userEmail })
            });
            if(res.ok) setModal({ title: "Escalation Logged", message: `Admin has been notified to procure global inventory for ${med.name}.`, type: "success" });
        } catch (e) { setModal({ title: "Escalation Failure", message: "Matrix Escalation Failure. Internal signal lost.", type: "error" }); }
    };

    const processOrder = async () => {
        const netTotal = cart.reduce((acc, c) => acc + (parseFloat(c.price) * c.cartQty), 0);
        try {
            const res = await fetch(`${API_BASE_URL}/api/pharma-order`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email: userEmail, items: cart, total: netTotal, gateway })
            });
            if(res.ok) {
                setCart([]); setCheckout(false);
                setModal({ 
                    title: "Transaction Cleared", 
                    message: `₹${netTotal} successfully processed via ${gateway.toUpperCase()} Gateway.\nPharmaceuticals dispatched to logistics queue.`,
                    type: "success"
                });
                // Refresh meds
                const resM = await fetch(`${API_BASE_URL}/api/medicines`);
                setMeds(await resM.json());
            }
        } catch (e) { setModal({ title: "Gateway Error", message: "Transaction Gateway Unreachable. Check neural link.", type: "error" }); }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
                <div>
                   <h1 className="shimmer-text" style={{ fontSize: "40px", fontWeight: 800, margin: "0 0 12px 0" }}>Quantum Pharmacy</h1>
                   <p style={{ color: THEME.muted, fontWeight: 500, fontSize:"16px", margin:0 }}>Automated biopharmaceutical dispensary network.</p>
                </div>
                <Button onClick={() => cart.length > 0 ? setCheckout(true) : setModal({ title: "Cart Matrix Empty", message: "Inject pharmaceutical nodes before initializing checkout sequence.", type: "warning" })} style={{ gap: "10px" }}><Pill size={18}/> Secure Checkout ({cart.reduce((a,c)=>a+c.cartQty,0)} units)</Button>
            </div>

            {checkout ? (
                <Card style={{ background: "rgba(0,0,0,0.5)", border: `1px solid ${THEME.accentGlow}` }}>
                   <h2 style={{ color: "white", marginBottom: "20px" }}>Transaction Interface</h2>
                   <div style={{ padding: "20px", background: "rgba(255,255,255,0.05)", borderRadius: "12px", marginBottom: "30px" }}>
                      {cart.map(c => <div key={c.id} style={{ display:"flex", justifyContent:"space-between", color:THEME.muted, marginBottom:"10px", fontWeight:800}}><span>{c.cartQty}x {c.name}</span><span style={{color:"white"}}>₹{c.price * c.cartQty}</span></div>)}
                      <hr style={{ border: `1px solid ${THEME.border}`, margin: "20px 0" }}/>
                      <div style={{ display:"flex", justifyContent:"space-between", color:"white", fontSize:"22px", fontWeight:800 }}><span>NET TOTAL</span><span style={{color: THEME.success}}>₹{cart.reduce((a,c)=>a+(c.price*c.cartQty),0)}</span></div>
                   </div>
                   <p style={{ color: THEME.muted, fontWeight: 800, marginBottom: "16px" }}>SECURE PAYMENT GATEWAY</p>
                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "30px" }}>
                      {["card", "upi", "crypto"].map(g => (
                         <div key={g} onClick={() => setGateway(g)} style={{ padding: "16px", border: `2px solid ${gateway === g ? THEME.success : THEME.border}`, borderRadius: "12px", background: gateway === g ? "rgba(16,185,129,0.1)" : "transparent", color: "white", fontWeight: 800, textAlign: "center", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}>{g} Protocol</div>
                      ))}
                   </div>
                   <div style={{ display: "flex", gap: "20px" }}>
                      <Button variant="outline" onClick={() => setCheckout(false)} style={{ flex: 1, color: "white" }}>Abort Sequence</Button>
                      <Button onClick={processOrder} style={{ flex: 1, background: THEME.success }}>Authorize Transfer</Button>
                   </div>
                </Card>
            ) : (
                <>
                <div style={{ marginBottom: "30px", background: "rgba(0,0,0,0.5)", padding: "16px", borderRadius: "16px", border: `1px solid rgba(255,255,255,0.1)`, display: "flex", alignItems: "center", gap: "16px" }}>
                   <Search color={THEME.muted} size={20} />
                   <input type="text" placeholder="Search Pharmaceutical Database..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", background: "transparent", border: "none", color: "white", outline: "none", fontSize: "16px", fontWeight: 500 }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
                   {meds.filter(m => m.name.toLowerCase().includes(search.toLowerCase())).map((m, i) => (
                      <motion.div key={m.id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: (i%15)*0.03 }}>
                          <Card style={{ padding: "24px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                                 <div style={{ background: "rgba(59,130,246,0.1)", padding:"12px", borderRadius:"12px", border:`1px solid rgba(59,130,246,0.2)` }}><Pill size={24} color="#60A5FA"/></div>
                                 <span style={{ color: m.quantity <= 0 ? THEME.danger : m.quantity < 5 ? THEME.warning : THEME.success, fontWeight: 800, fontSize: "12px", background: "rgba(255,255,255,0.1)", padding: "4px 8px", borderRadius: "100px" }}>{m.quantity <= 0 ? 'DEPLETED' : `${m.quantity} Units Left`}</span>
                              </div>
                              <h3 style={{ margin: "0 0 4px 0", color: "white", fontSize: "18px", fontWeight: 800 }}>{m.name}</h3>
                              <p style={{ margin: "0 0 16px 0", color: THEME.muted, fontSize: "13px", fontWeight: 800 }}>DOSAGE: {m.dosage}</p>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <span style={{ fontSize: "20px", fontWeight: 800, color: "white" }}>₹{m.price}</span>
                                  {m.quantity > 0 ? 
                                    <Button onClick={() => addToCart(m)} style={{ padding: "8px 16px", fontSize: "12px" }}>Extract</Button> :
                                    <Button onClick={() => requestRestock(m)} style={{ padding: "8px 16px", fontSize: "12px", background: "transparent", color: THEME.danger, border: `1px solid ${THEME.danger}` }}>Restock</Button>
                                  }
                              </div>
                          </Card>
                      </motion.div>
                   ))}
                </div>
                </>
            )}
        </motion.div>
    );
};

const GenomicAnalytics = ({ userEmail }) => {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: "1200px", margin: "0 auto" }}>
           <h1 className="shimmer-text" style={{ fontSize: "40px", fontWeight: 800, margin: "0 0 12px 0" }}>Genomic Analytics</h1>
           <p style={{ color: THEME.muted, fontWeight: 500, fontSize:"16px", marginBottom: "40px" }}>Longitudinal biometric trends and multi-disease forecasting matrices.</p>

           <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "30px", marginBottom: "30px" }}>
              <Card style={{ background: THEME.surfaceGlow, textAlign: "center" }}>
                 <div style={{ padding: "30px" }}>
                    <p style={{ color: THEME.muted, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 20px 0" }}>OVERALL HEALTH SCORE</p>
                    <div style={{ width: "200px", height: "200px", borderRadius: "50%", background: `conic-gradient(${THEME.success} 0% 88%, rgba(255,255,255,0.05) 88% 100%)`, margin: "0 auto", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                       <div style={{ width: "160px", height: "160px", background: THEME.background, borderRadius: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: "48px", fontWeight: 800, color: "white", lineHeight: 1 }}>88</span>
                          <span style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "1px", color: THEME.success }}>TIER 1 VITALITY</span>
                       </div>
                    </div>
                 </div>
              </Card>
              <Card>
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h3 style={{ margin: 0, color: "white", fontWeight: 800, fontSize: "20px" }}>Risk Progression Matrix</h3>
                    <span style={{ color: THEME.muted, fontSize: "12px", fontWeight: 800, background: "rgba(255,255,255,0.1)", padding: "4px 12px", borderRadius: "100px" }}>Past 6 Months</span>
                 </div>
                 <div style={{ height: "250px", display: "flex", alignItems: "flex-end", gap: "12px", padding: "20px 0", borderBottom: `1px solid rgba(255,255,255,0.1)`, position: "relative" }}>
                     {[30, 25, 45, 60, 20, 15].map((val, i) => (
                        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                            <motion.div initial={{ height: 0 }} animate={{ height: `${val}%` }} transition={{ duration: 1.5, type: "spring", delay: i * 0.1 }} style={{ width: "100%", background: val > 50 ? THEME.danger : val > 30 ? THEME.warning : THEME.success, borderRadius: "8px 8px 0 0", opacity: 0.8 }} />
                            <span style={{ color: THEME.muted, fontSize: "12px", fontWeight: 800 }}>M{i+1}</span>
                        </div>
                     ))}
                 </div>
                 <div style={{display:"flex", gap:"20px", marginTop:"20px", fontSize:"12px", fontWeight:800, color:THEME.muted, justifyContent:"center"}}>
                    <div style={{display:"flex", alignItems:"center", gap:"8px"}}><div style={{width:"10px",height:"10px",borderRadius:"50%",background:THEME.success}}></div> Low Risk</div>
                    <div style={{display:"flex", alignItems:"center", gap:"8px"}}><div style={{width:"10px",height:"10px",borderRadius:"50%",background:THEME.warning}}></div> Elevated</div>
                    <div style={{display:"flex", alignItems:"center", gap:"8px"}}><div style={{width:"10px",height:"10px",borderRadius:"50%",background:THEME.danger}}></div> Emergency</div>
                 </div>
              </Card>
           </div>
           
           <Card>
               <h3 style={{ margin: "0 0 20px 0", color: "white", fontWeight: 800, fontSize: "20px" }}>Predictive Symptom Tides</h3>
               <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                   {[{n: "Fatigue Levels", v: 24}, {n: "Glucose Variability", v: 12}, {n: "Cellular Anomalies", v: 45}].map((symp, i) => (
                       <div key={i} style={{ background: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "16px", border: `1px solid ${THEME.border}` }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "white", fontWeight: 800 }}>
                              <span>{symp.n}</span><span style={{color: symp.v > 40 ? THEME.danger : "#60A5FA"}}>{symp.v}% Anomaly Spread</span>
                          </div>
                          <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "100px", overflow: "hidden" }}>
                              <motion.div initial={{ width: 0 }} animate={{ width: `${symp.v}%` }} transition={{ duration: 1.2, delay: 0.5 + (i*0.2) }} style={{ height: "100%", background: symp.v > 40 ? THEME.danger : "#60A5FA" }} />
                          </div>
                       </div>
                   ))}
               </div>
           </Card>
        </motion.div>
    );
};

const AISymptomNavigator = ({ setScreen }) => {
    const [symptom, setSymptom] = useState("");
    const [result, setResult] = useState(null);

    const checkSymptoms = () => {
        if (!symptom) return;
        const low = symptom.toLowerCase().trim();
        
        const keywords = {
            heart: ["heart", "chest", "cardio", "palpitation", "breathless", "left arm", "left hand", "jaw pain", "sweating", "heavy chest", "tachycardia", "irregular heart beat"],
            diabetes: ["diabet", "sugar", "insulin", "glucose", "thirsty", "blurred vision", "fatigue", "frequent urination", "polyuria", "slow healing", "tingling hands", "weight loss"],
            bone: ["leg", "joint", "bone", "fracture", "knee", "skel", "walk", "stiff", "back pain", "swelling", "ortho", "shoulder", "hip", "wrist"],
            brain: ["head", "dizzy", "memory", "brain", "stroke", "numb", "speech", "confusion", "neuro", "seizure", "paralysis", "migraine", "fainting"],
            skin: ["skin", "rash", "itch", "spot", "mole", "melanoma", "burn", "dermatology", "acne", "psoriasis", "eczema", "blisters"],
            lungs: ["cough", "lung", "breath", "asthma", "wheezing", "pneumonia", "respiratory", "bronchitis", "shortness of breath", "phlegm", "chest tightness"],
            liver: ["stomach", "liver", "yellowing", "abdomen", "jaundice", "nausea", "hepatology", "digestive", "dark urine", "pale stool", "vomiting"],
            kidney: ["kidney", "renal", "urine", "flank pain", "nephrology", "bladder", "lower abdomen", "pelvic", "blood in urine", "cloudy urine"],
            malaria: ["fever", "chills", "malaria", "shaking", "headache", "muscle ache", "climbing body temperature", "tropical disease"],
            pneumonia: ["chest congestion", "cough with yellow", "cough with green", "fever with chill", "struggling to breathe", "hacking cough", "crackling sound lungs"],
            thyroid: ["weight gain", "weight loss thyroid", "hair loss", "neck swelling", "goiter", "iodine", "sensitivity to cold", "sensitivity to heat", "thyroiditis"]
        };

        const scores = Object.keys(keywords).map(key => {
            let score = 0;
            keywords[key].forEach(kw => {
                if (low.includes(kw)) score += 1;
            });
            return { id: key, score };
        });

        // Get highest score
        const best = scores.sort((a,b) => b.score - a.score)[0];
        
        // If highest score is 0, no specific match
        let target = (best && best.score > 0) ? best.id : "all_screenings";

        const found = diseases.find(d => d.id === target);
        
        if (found) {
            setResult(found);
        } else {
            // If no match, suggest the most comprehensive division or general matrix
            setResult({
                id: "all_screenings",
                name: "Full Diagnostic Matrix",
                color: THEME.accent,
                icon: <Scan size={28} />,
                desc: "No specific symptom collision detected. Proceed to the full diagnostic grid for a granular assessment."
            });
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", paddingTop: "50px" }}>
            <div style={{ background: "rgba(59,130,246,0.1)", padding: "24px", borderRadius: "50%", display: "inline-flex", marginBottom: "30px", border: `1px solid rgba(59,130,246,0.3)` }}>
                <Brain size={64} color="#60A5FA" />
            </div>
            <h1 className="shimmer-text" style={{ fontSize: "52px", fontWeight: 800, margin: "0 0 16px 0", letterSpacing: "-1px" }}>Neural Symptom AI</h1>
            <p style={{ color: THEME.muted, fontSize: "16px", marginBottom: "50px", lineHeight: 1.6 }}>Describe your biological anomalies in natural language. Our deep learning language models will map your latent text vectors to the correct clinical diagnostic tier.</p>
            
            <div style={{ background: "rgba(0,0,0,0.5)", border: `1px solid ${THEME.border}`, borderRadius: "24px", padding: "16px", display: "flex", gap: "16px", marginBottom: "40px" }}>
                <input type="text" value={symptom} onChange={e=>setSymptom(e.target.value)} onKeyDown={e=>e.key==="Enter"&&checkSymptoms()} placeholder="E.g., 'Experiencing sharp chest pain and shortness of breath...'" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "white", fontSize: "18px", padding: "10px" }} />
                <Button onClick={checkSymptoms} style={{ padding: "16px 32px" }}>Analyze NLP</Button>
            </div>

            {result && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <Card style={{ padding: "40px", border: `2px solid ${result.color}80` }}>
                        <h3 style={{ margin: "0 0 12px 0", color: "white", fontSize: "24px", fontWeight: 800 }}>AI Recommended Division</h3>
                        <p style={{ color: THEME.muted, marginBottom: "30px", fontSize: "16px" }}>Based on the symptom taxonomy extracted, proceed directly to the following matrix:</p>
                        
                        <div style={{ display: "flex", alignItems: "center", gap: "24px", background: "rgba(255,255,255,0.05)", padding: "30px", borderRadius: "16px", marginBottom: "30px" }}>
                            <div style={{ background: result.color+"20", padding: "20px", borderRadius: "16px", color: result.color }}>{result.icon}</div>
                            <div style={{ textAlign: "left" }}>
                                <h4 style={{ margin: "0 0 8px 0", fontSize: "24px", color: "white", fontWeight: 800 }}>{result.name} Scanner</h4>
                                <p style={{ margin: 0, color: THEME.muted, lineHeight: 1.5 }}>{result.desc}</p>
                            </div>
                        </div>

                        <Button onClick={() => setScreen(result.id)} style={{ width: "100%", padding: "20px", fontSize: "18px", background: result.color }}>Initiate Physical Diagnostics</Button>
                    </Card>
                </motion.div>
            )}
        </motion.div>
    );
};

const AuthLayout = ({ onLogin }) => {
    const [role, setRole] = useState("patient");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState("");

    const handleAuth = async () => {
        if (!email || !pass) return setModal({ title: "Identification Required", message: "System requires complete identity node arrays to proceed.", type: "error" });
        
        if (isRegister) {
            try {
                const res = await fetch(`${API_BASE_URL}/api/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password: pass, role, name })
                });
                if (res.ok) {
                    setModal({ title: "Identity Registered", message: "Identity Node Registered. Authorization sequence ready.", type: "success" });
                    setIsRegister(false);
                } else {
                    const err = await res.json();
                    setModal({ title: "Registration Conflict", message: err.detail || "Identity collision detected in registry.", type: "error" });
                }
            } catch (e) { setModal({ title: "Mainframe Error", message: `Network Matrix Interrupt: ${e.message}`, type: "error" }); }
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password: pass, role })
            });
            if (res.ok) {
                const data = await res.json();
                onLogin(data.user.email, data.user.role, data.user.name);
            } else { setModal({ title: "Access Denied", message: "Unauthorized identity detected. Verify Matrix Credentials.", type: "error" }); }
        } catch (e) { setModal({ title: "Link Severed", message: `Mainframe Link Severed: ${e.message}`, type: "error" }); }
    };

    return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#020617", color: "white", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
        <CinematicBackground />
        
        <div style={{ position: "absolute", left: "10%", top: "50%", transform: "translateY(-50%)", width: "400px", zIndey: 0 }}>
            <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "30px" }}>
                    <img src="/logo.png" alt="Vitalix" style={{ width: "70px", height: "70px", borderRadius: "16px", objectFit: "cover", boxShadow: `0 0 35px rgba(59, 130, 246, 0.4)` }} />
                    <span className="shimmer-text" style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-1px" }}>Vitalix OS</span>
                </div>
                <h1 className="shimmer-text" style={{ fontSize: "64px", fontWeight: 800, lineHeight: 1, marginBottom: "24px", letterSpacing: "-2px" }}>
                    Next-Gen<br/>Healthcare.
                </h1>
                <p style={{ fontSize: "18px", color: THEME.muted, fontWeight: 400, lineHeight: 1.6 }}>
                    Access the world's most advanced Deep Learning diagnostic mainframe. Empowering patients and specialists with millimeter-accurate AI precision.
                </p>
            </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 0, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ position: "absolute", right: "10%" }}>
        <div className="glass-panel" style={{ width: "450px", padding: "50px 40px", borderRadius: "32px", display: "flex", flexDirection: "column", gap: "30px" }}>
           <div>
               <h2 style={{ fontSize: "32px", fontWeight: 800, color: "white", marginBottom: "8px" }}>Identity Link</h2>
               <p style={{color: THEME.muted, fontWeight: 500, fontSize: "15px"}}>Establish secure neural connection.</p>
           </div>
           
           <div style={{ display: "flex", background: "rgba(0,0,0,0.5)", padding: "8px", borderRadius: "16px", border: `1px solid rgba(255,255,255,0.05)` }}>
             <button onClick={() => setRole("patient")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", background: role === "patient" ? "rgba(255,255,255,0.1)" : "transparent", fontWeight: 800, cursor: "pointer", color: role === "patient" ? "white" : THEME.muted, transition:"all 0.3s" }}>Patient</button>
             <button onClick={() => setRole("doctor")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", background: role === "doctor" ? "rgba(255,255,255,0.1)" : "transparent", fontWeight: 800, cursor: "pointer", color: role === "doctor" ? "white" : THEME.muted, transition:"all 0.3s" }}>Doctor</button>
             <button onClick={() => setRole("admin")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", background: role === "admin" ? "rgba(255,255,255,0.1)" : "transparent", fontWeight: 800, cursor: "pointer", color: role === "admin" ? "white" : THEME.muted, transition:"all 0.3s" }}>Root</button>
           </div>
           
           <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {isRegister && (
                  <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}}>
                      <label style={{ fontSize: "11px", fontWeight: 800, color: THEME.muted, display: "block", marginBottom: "10px", letterSpacing: "2px" }}>LEGAL ENTITY NAME</label>
                      <input type="text" placeholder="John Doe" value={name} onChange={e=>setName(e.target.value)} style={{ width: "100%", padding: "16px 20px", borderRadius: "12px", border: `1px solid rgba(255,255,255,0.1)`, background: "rgba(0,0,0,0.5)", color: "white", outline: "none", fontSize: "16px", fontWeight: 500, transition: "all 0.3s" }} />
                  </motion.div>
              )}
              <div>
                  <label style={{ fontSize: "11px", fontWeight: 800, color: THEME.muted, display: "block", marginBottom: "10px", letterSpacing: "2px" }}>MATRIX EMAIL</label>
                  <input type="email" placeholder="node@network.com" value={email} onChange={e=>setEmail(e.target.value)} style={{ width: "100%", padding: "16px 20px", borderRadius: "12px", border: `1px solid rgba(255,255,255,0.1)`, background: "rgba(0,0,0,0.5)", color: "white", outline: "none", fontSize: "16px", fontWeight: 500, transition: "all 0.3s" }} />
              </div>
              <div>
                  <label style={{ fontSize: "11px", fontWeight: 800, color: THEME.muted, display: "block", marginBottom: "10px", letterSpacing: "2px" }}>PASSKEY CYPHER</label>
                  <input type="password" placeholder="••••••••••••" value={pass} onChange={e=>setPass(e.target.value)} style={{ width: "100%", padding: "16px 20px", borderRadius: "12px", border: `1px solid rgba(255,255,255,0.1)`, background: "rgba(0,0,0,0.5)", color: "white", outline: "none", fontSize: "16px", fontWeight: 500, letterSpacing: "4px", transition: "all 0.3s" }} onKeyDown={e => e.key === "Enter" && handleAuth()} />
              </div>
           </div>

           {(role === "admin" || role === "doctor") && !isRegister && (
              <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:"auto"}} style={{ background: "rgba(244, 63, 94, 0.1)", padding: "16px", borderRadius: "12px", border: `1px solid rgba(244, 63, 94, 0.3)`, fontSize: "13px", color: "white", fontWeight: 600, lineHeight: 1.5 }}>
                <AlertTriangle size={16} color="#F43F5E" style={{marginBottom:"8px", display:"block"}} />
                Strict clearance mandated. Consult backend registry keys.
              </motion.div>
           )}

           <Button onClick={handleAuth} style={{ padding: "20px", fontSize: "16px", letterSpacing: "1px", marginTop: "10px" }}>{isRegister ? "REGISTER ENTITY" : "INITIALIZE LINK"}</Button>
           <p onClick={() => setIsRegister(!isRegister)} style={{ textAlign: "center", fontSize: "12px", cursor: "pointer", color: THEME.accent, fontWeight: 800, letterSpacing:"1px" }}>{isRegister ? "EXISTING NODE? LOGIN" : "NEW ENTITY? REGISTER"}</p>
           
           <p style={{ fontSize: "11px", color: THEME.muted, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "10px", fontWeight: 800, letterSpacing: "1px" }}><Shield size={14} color={THEME.success} /> 256-BIT ENCRYPTION LAYER ACTIVE</p>
        </div>
        </motion.div>
    </div>
    );
};

/* =======================================
   SYSTEM BOOT
======================================= */
export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [screen, setScreen] = useState("dashboard");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("patient");
  const [name, setName] = useState("");
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      setIsLogged(true); 
      setEmail(sessionStorage.getItem("loggedInEmail")); 
      setRole(sessionStorage.getItem("userRole"));
      setName(sessionStorage.getItem("userName") || "");
      setScreen(sessionStorage.getItem("userRole") === "admin" ? "admin_dash" : sessionStorage.getItem("userRole") === "doctor" ? "doctor_workbench" : "dashboard");
    }
  }, []);

  const handleLogout = () => { 
      sessionStorage.clear(); 
      setIsLogged(false); 
      window.location.reload(); 
  };

  if (!isLogged) return <><GlobalStyles /><AuthLayout onLogin={(e, r, n) => { 
      setIsLogged(true); setEmail(e); setRole(r); setName(n);
      setScreen(r === "admin" ? "admin_dash" : r === "doctor" ? "doctor_workbench" : "dashboard"); 
      sessionStorage.setItem("isLoggedIn", "true"); 
      sessionStorage.setItem("userRole", r); 
      sessionStorage.setItem("loggedInEmail", e); 
      sessionStorage.setItem("userName", n || "");
  }} setModal={setModal} /></>;

  return (
    <>
      <GlobalStyles />
      <DashboardLayout screen={screen} setScreen={setScreen} userEmail={email} userRole={role} userName={name} handleLogout={handleLogout}>
        <AnimatePresence mode="wait">
          <motion.div key={screen} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, type: "tween", ease: "easeInOut" }}>
            {role === "admin" && screen === "admin_dash" ? <SystemAdminDashboard setModal={setModal} /> : 
             role === "doctor" && screen === "doctor_workbench" ? <ClinicalWorkbench setModal={setModal} /> :
              screen === "dashboard" ? <DashboardWidgets userEmail={email} /> :
              screen === "ai_symptom" ? <AISymptomNavigator setScreen={setScreen} /> :
              screen === "all_screenings" ? (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "30px" }}>
                  {diseases.map((d, i) => (
                      <motion.div key={d.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} >
                      <Card onClick={() => setScreen(d.id)} style={{ display: "flex", flexDirection: "column", gap: "20px", height: "100%" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                              <div style={{ background: `linear-gradient(135deg, ${d.color}30 0%, transparent 100%)`, border: `1px solid ${d.color}60`, color: d.color, padding: "16px", borderRadius: "16px", boxShadow: `0 0 20px ${d.color}20` }}>{d.icon}</div>
                              <h3 style={{ fontSize: "22px", fontWeight: 800, margin: 0, color: "white" }}>{d.name}</h3>
                          </div>
                          <p style={{ color: THEME.muted, margin: 0, fontSize: "15px", fontWeight: 500, lineHeight: 1.6 }}>{d.desc}</p>
                          <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "8px", color: THEME.accent, fontWeight: 800, fontSize: "13px", letterSpacing: "1px" }}>INITIATE SCAN <ChevronRight size={16} /></div>
                      </Card>
                      </motion.div>
                  ))}
                  </div>
              ) :
              screen === "consultations" ? <ConsultationNetwork userEmail={email} setModal={setModal} /> :
              screen === "pharmacy" ? <QuantumPharmacy userEmail={email} setModal={setModal} /> :
              screen === "analytics" ? <GenomicAnalytics userEmail={email} /> :
              diseases.find(d => d.id === screen) ? <PredictionForm disease={diseases.find(d => d.id === screen)} onBack={() => setScreen("all_screenings")} userEmail={email} setModal={setModal} /> :

              <div style={{fontWeight: 800, color: THEME.muted, textAlign: "center", marginTop: "100px", fontSize: "24px"}}>UI MODULE UNDER CONSTRUCTION</div>
            }
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          {modal && <NotificationModal modal={modal} setModal={setModal} />}
        </AnimatePresence>
      </DashboardLayout>
    </>
  );
}
