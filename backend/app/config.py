# backend/app/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Student Dropout Risk Prediction API"
    version: str = "1.0.0"
    api_prefix: str = "/api/v1"

    # Model settings
    model_path: str = "ml/saved_models/model.joblib"
    scaler_path: str = "ml/saved_models/scaler.joblib"

    # CORS settings
    allowed_origins: list = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    class Config:
        env_file = ".env"

settings = Settings()
