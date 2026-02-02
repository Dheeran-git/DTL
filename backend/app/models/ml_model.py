# backend/app/models/ml_model.py
import joblib
import os
import shutil
from typing import Optional, List, Union
import numpy as np

from app.config import settings


class MLModel:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.is_loaded = False

    def archive_legacy_files(self, legacy_paths: List[str]):
        """Move legacy model/scaler files to the archived_models_dir and rename them with DEPRECATED tag."""
        archived_dir = settings.archived_models_dir
        os.makedirs(archived_dir, exist_ok=True)

        for path in legacy_paths:
            try:
                if os.path.exists(path):
                    base = os.path.basename(path)
                    name, ext = os.path.splitext(base)
                    new_name = f"{name}_DEPRECATED{ext}"
                    dest = os.path.join(archived_dir, new_name)
                    # If destination exists, append a numeric suffix
                    count = 1
                    final_dest = dest
                    while os.path.exists(final_dest):
                        final_dest = os.path.join(archived_dir, f"{name}_DEPRECATED_{count}{ext}")
                        count += 1
                    shutil.move(path, final_dest)
                    print(f"Archived legacy file {path} -> {final_dest}")
            except Exception as e:
                print(f"Failed to archive {path}: {e}")

    def load_model(self, model_path: str, scaler_path: str) -> bool:
        """Load the trained model and scaler from provided paths."""
        try:
            if os.path.exists(model_path) and os.path.exists(scaler_path):
                try:
                    self.model = joblib.load(model_path)
                except Exception as e:
                    print(f"Error loading model: {e}")
                    raise

                self.scaler = joblib.load(scaler_path)
                self.is_loaded = True
                print(f"Model loaded successfully from {model_path}")
                return True
            else:
                print(f"Warning: Model files not found at {model_path} or {scaler_path}. Using fallback prediction.")
                return False
        except Exception as e:
            import traceback
            print(f"Error loading model from {model_path}: {e}")
            traceback.print_exc()
            return False

    def _prepare_features(self, features: Union[List[float], np.ndarray]) -> np.ndarray:
        """Ensure features are a 2D NumPy array in the shape (1, n_features)."""
        arr = np.array(features)
        if arr.ndim == 1:
            arr = arr.reshape(1, -1)
        return arr

    def predict(self, features: Union[List[float], np.ndarray]) -> Optional[dict]:
        """Make prediction using the loaded model.

        Returns dict with keys: `dropout_probability` (float 0-1), `predicted_class` ("Dropout"/"Non-Dropout"), and `model_confidence` (float).
        """
        if not self.is_loaded:
            return None

        try:
            X = self._prepare_features(features)
            X_scaled = self.scaler.transform(X)
            probs = self.model.predict_proba(X_scaled)[0]
            # Assuming class 1 is Dropout
            # Determine index of positive class (1) if classes_ not ordered
            if hasattr(self.model, 'classes_'):
                classes = list(self.model.classes_)
                if 1 in classes:
                    pos_idx = classes.index(1)
                elif 'Dropout' in classes:
                    pos_idx = classes.index('Dropout')
                else:
                    # Fallback: assume second column is positive class
                    pos_idx = 1 if len(probs) > 1 else 0
            else:
                pos_idx = 1 if len(probs) > 1 else 0

            dropout_probability = float(probs[pos_idx])
            predicted_index = int(self.model.predict(X_scaled)[0])
            # Explicitly map prediction to Dropout/Non-Dropout
            predicted_class = "Dropout" if predicted_index == 1 else "Non-Dropout"
            model_confidence = float(max(probs))

            return {
                'dropout_probability': dropout_probability,
                'predicted_class': predicted_class,
                'model_confidence': model_confidence
            }
        except Exception as e:
            print(f"Prediction error: {e}")
            return None


# Global model instance
ml_model = MLModel()
