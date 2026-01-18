# 🎓 StudentRetain - Student Dropout Risk Prediction System

An ML-powered student dropout risk prediction system with personalized support recommendations.

**Design Thinking Lab Project - RV College of Engineering**

---

## 👥 Team

- **Sathvik K Y** - 1RV24CS255
- **Sandesh S Patrot** - 1RV24CS250
- **Roshan George** - 1RV24CS235
- **S Dheeran** - 1RV24CS237

---

## 🚀 Features

- ✅ **ML-Based Prediction**: Random Forest model with 85% accuracy, 0.89 AUC-ROC
- ✅ **Privacy-First**: Explicit consent collection with GDPR-compliant approach
- ✅ **Multi-Factor Assessment**: Academic, mental health, financial indicators
- ✅ **Personalized Recommendations**: Tailored support based on risk factors
- ✅ **Admin Dashboard**: Real-time analytics and trend visualization
- ✅ **Responsive Design**: Modern UI with Tailwind CSS and Framer Motion

---

## 📁 Project Structure

```
Student_Dropout_Risk/
├── frontend/                 # Next.js 14 Application
│   ├── app/                  # Pages (Home, Assessment, Results, Dashboard, About)
│   ├── components/           # React components
│   ├── lib/                  # API client & utilities
│   ├── types/                # TypeScript types
│   └── package.json
│
└── backend/                  # FastAPI Application
    ├── app/
    │   ├── models/           # Pydantic schemas & ML model
    │   ├── routers/          # API endpoints
    │   └── main.py           # FastAPI entry point
    ├── ml/
    │   ├── train_model.py    # Model training script
    │   ├── data/             # Dataset (download separately)
    │   └── saved_models/     # Trained models
    └── requirements.txt
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** + **shadcn/ui**
- **Framer Motion** (animations)
- **Recharts** (data visualization)

### Backend & ML
- **FastAPI** (Python web framework)
- **scikit-learn** (Random Forest model)
- **Grid Search** optimization
- **5-fold** cross-validation
- **Kaggle Dataset** (4,424 students)

---

## 🔧 Setup Instructions

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.9+
- **Git**

### 1. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: **http://localhost:3000**

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
uvicorn app.main:app --reload
```

Backend API will be available at: **http://localhost:8000**
API Docs: **http://localhost:8000/docs**

### 3. Dataset & Model Training (Optional)

Download the dataset from Kaggle:
- **URL**: https://www.kaggle.com/datasets/thedevastator/higher-education-predictors-of-student-retention
- Place `dataset.csv` in `backend/ml/data/`

Train the model:
```bash
cd backend/ml
python train_model.py
```

This will generate:
- `saved_models/model.joblib` (trained model)
- `saved_models/scaler.joblib` (feature scaler)

---

## 📖 Usage

1. **Home Page**: Overview of the system with key statistics
2. **Take Assessment**: 5-step form with consent, academic, support, personal, and services questions
3. **View Results**: Risk score, identified factors, and personalized recommendations
4. **Dashboard**: Admin view with analytics, trends, and recent assessments
5. **About**: Project information, team details, and future scope

---

## 🌐 Deployment

### Frontend (Vercel)

```bash
cd frontend
npm run build
# Deploy to Vercel
vercel deploy
```

### Backend (Render / Railway)

Create `Dockerfile` in backend:
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Deploy to Render or Railway following their deployment guides.

---

## 📊 Model Performance

- **Accuracy**: 85%
- **AUC-ROC**: 0.89
- **Training Data**: 4,424 students
- **Features**: 8 optimal features (F6 set)
- **Algorithm**: Random Forest with Grid Search

### Top 3 Predictive Features:
1. Curricular units 2nd semester (approved)
2. Curricular units 1st semester (approved)
3. Tuition fees up to date

---

## 🔮 Future Scope

- 🔮 **College ERP Integration**: Connect with institutional databases
- 🔮 **Multi-Stakeholder Views**: Dashboards for Faculty, Counsellors, Admin
- 🔮 **Automated Alerts**: Email/SMS notifications for high-risk students
- 🔮 **Periodic Reassessment**: Track student progress over time
- 🔮 **Continuous Model Improvement**: Fine-tune with real institutional data
- 🔮 **Mobile Application**: Native apps for iOS and Android

---

## 📝 License

This project is part of a Design Thinking Lab course at RV College of Engineering.

---

## 📞 Contact

For questions or feedback, contact the team at RV College of Engineering.

---

**Built with ❤️ using Next.js, FastAPI, and Random Forest ML**
