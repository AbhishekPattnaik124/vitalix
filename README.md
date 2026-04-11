# Vitalix OS - Next-Gen Medical Platform

A premium, full-stack medical diagnostics and pharmaceutical logistics platform built with React, FastAPI, and MongoDB.

## 🚀 Features
- **Neural Diagnostics**: AI-driven symptom checker.
- **Quantum Pharmacy**: Real-time inventory management with 100+ medicines.
- **Clinical Workbench**: Specialist appointment management system.
- **Admin Data Center**: Financial ledger tracking patient payments and commission payouts.

## 🛠️ Project Structure
- `/frontend`: Vite-React glassmorphic UI.
- `/backend`: FastAPI asynchronous server with ML integration.

## 🗄️ Database Setup (MongoDB)
The project uses **MongoDB** named `vitalix` for persistent storage.

To initialize the database with 100 medicine records:
1. Ensure MongoDB is running on your machine.
2. Navigate to `/backend`.
3. Run the initialization script:
   ```bash
   python db_init.py
   ```

## 🏃 Running Locally
1. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python main.py
   ```
2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🔒 Security Note
Ensure you configure your `.env` file in the `/backend` directory with valid SMTP credentials and your `MONGODB_URI`.
