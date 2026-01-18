# backend/app/models/ml_model.py
import joblib
import os
from typing import Optional

class MLModel:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.is_loaded = False

    def load_model(self, model_path: str, scaler_path: str):
        """Load the trained model and scaler"""
        try:
            if os.path.exists(model_path) and os.path.exists(scaler_path):
                self.model = joblib.load(model_path)
                self.scaler = joblib.load(scaler_path)
                self.is_loaded = True
                print(f"Model loaded successfully from {model_path}")
                return True
            else:
                print(f"Warning: Model files not found. Using fallback prediction.")
                return False
        except Exception as e:
            print(f"Error loading model: {e}")
            return False

    def predict(self, features):
        """Make prediction using the loaded model"""
        if not self.is_loaded:
            return None

        try:
            # Scale features
            features_scaled = self.scaler.transform([features])
            # Get prediction
            prediction = self.model.predict(features_scaled)[0]
            probabilities = self.model.predict_proba(features_scaled)[0]
            return {
                'prediction': int(prediction),
                'probabilities': probabilities.tolist()
            }
        except Exception as e:
            print(f"Prediction error: {e}")
            return None

# Global model instance
ml_model = MLModel()
