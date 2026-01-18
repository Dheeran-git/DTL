# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.models.schemas import HealthResponse
from app.models.ml_model import ml_model
from app.routers import prediction

# Initialize FastAPI app
app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    description="ML-powered student dropout risk prediction with personalized support recommendations"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(prediction.router, prefix=settings.api_prefix)

@app.on_event("startup")
async def startup_event():
    """Load ML model on startup"""
    print(f"Starting {settings.app_name} v{settings.version}")
    # Try to load the model (optional - will use fallback if not available)
    ml_model.load_model(settings.model_path, settings.scaler_path)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Student Dropout Risk Prediction API",
        "version": settings.version,
        "docs": "/docs"
    }

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        version=settings.version,
        model_loaded=ml_model.is_loaded
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
