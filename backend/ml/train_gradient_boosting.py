"""
Student Dropout Prediction Model Training
Gradient Boosting Classifier - Target: 87% accuracy, 0.93 AUC-ROC
Dataset: Kaggle - Higher Education Predictors of Student Retention
Compatible with scikit-learn 1.4.0
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, roc_auc_score
import joblib
import os

# Feature Set F6 - Optimal features from research
FEATURE_COLUMNS = [
    'Curricular units 2nd sem (approved)',
    'Curricular units 1st sem (approved)',
    'Tuition fees up to date',
    'Scholarship holder',
    'Age at enrollment',
    'Debtor',
    'Gender',
    'Application mode'
]

TARGET_COLUMN = 'Target'
MODEL_PATH = 'saved_models/model_gb.joblib'
SCALER_PATH = 'saved_models/scaler_gb.joblib'


def load_and_preprocess_data(filepath: str):
    """Load and preprocess the dataset."""
    print("=" * 60)
    print("LOADING DATASET")
    print("=" * 60)
    
    # Load data - CSV uses comma delimiter
    df = pd.read_csv(filepath, delimiter=',')
    print(f"Dataset shape: {df.shape}")
    print(f"Columns: {list(df.columns)[:10]}...")
    
    # Display target distribution
    print(f"\nTarget Distribution:")
    print(df[TARGET_COLUMN].value_counts())

    # Binary classification: Dropout = 1, Graduate/Enrolled = 0
    df['Target_Binary'] = df[TARGET_COLUMN].apply(
        lambda x: 1 if x == 'Dropout' else 0
    )

    print(f"\nBinary Target Distribution:")
    print(df['Target_Binary'].value_counts())

    # Select features
    X = df[FEATURE_COLUMNS].copy()
    y = df['Target_Binary'].copy()

    # Handle missing values
    X = X.fillna(X.median())

    print(f"\nFeatures selected: {len(FEATURE_COLUMNS)}")
    print(f"   Total samples: {len(X)}")
    print(f"   Dropout rate: {y.mean()*100:.1f}%")
    
    return X, y


def train_model(X, y):
    """Train Gradient Boosting with Grid Search optimization."""
    print("\n" + "=" * 60)
    print("TRAINING GRADIENT BOOSTING MODEL")
    print("=" * 60)
    
    # Split data (75:25 as per research)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.25, random_state=42, stratify=y
    )
    print(f"Training samples: {len(X_train)}")
    print(f"Testing samples: {len(X_test)}")
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Grid Search parameters for Gradient Boosting
    param_grid = {
        'n_estimators': [100, 200, 300],
        'learning_rate': [0.01, 0.05, 0.1],
        'max_depth': [3, 5, 7],
        'min_samples_split': [5, 10],
        'subsample': [0.8, 1.0]
    }
    
    # For faster training, use reduced grid
    param_grid_fast = {
        'n_estimators': [100, 200],
        'learning_rate': [0.05, 0.1],
        'max_depth': [3, 5],
        'min_samples_split': [5, 10],
        'subsample': [0.8]
    }
    
    gb = GradientBoostingClassifier(random_state=42)
    
    print("\nRunning Grid Search with 5-fold cross-validation...")
    print("   (This may take 3-10 minutes)")
    
    grid_search = GridSearchCV(
        gb,
        param_grid_fast,
        cv=5,
        scoring='roc_auc',
        n_jobs=-1,
        verbose=1
    )

    grid_search.fit(X_train_scaled, y_train)

    best_model = grid_search.best_estimator_

    print(f"\nBest Parameters:")
    for param, value in grid_search.best_params_.items():
        print(f"   {param}: {value}")

    # Evaluate on test set
    print("\n" + "=" * 60)
    print("MODEL PERFORMANCE")
    print("=" * 60)
    
    y_pred = best_model.predict(X_test_scaled)
    y_pred_proba = best_model.predict_proba(X_test_scaled)[:, 1]
    
    accuracy = accuracy_score(y_test, y_pred)
    auc_roc = roc_auc_score(y_test, y_pred_proba)
    
    print(f"Accuracy:  {accuracy:.4f} ({accuracy*100:.1f}%)")
    print(f"AUC-ROC:   {auc_roc:.4f}")

    print(f"\nClassification Report:")
    print(classification_report(y_test, y_pred, target_names=['Non-Dropout', 'Dropout']))

    print(f"\nConfusion Matrix:")
    tn, fp, fn, tp = confusion_matrix(y_test, y_pred).ravel()
    print(f"   TN={tn}, FP={fp}")
    print(f"   FN={fn}, TP={tp}")

    print(f"\nFeature Importance (Top Predictors):")
    importance_df = pd.DataFrame({
        'Feature': FEATURE_COLUMNS,
        'Importance': best_model.feature_importances_
    }).sort_values('Importance', ascending=False)

    for _, row in importance_df.iterrows():
        bar = '#' * int(row['Importance'] * 50)
        print(f"   {row['Feature'][:40]:40s} {row['Importance']:.4f} {bar}")
    
    return best_model, scaler


def save_model(model, scaler):
    """Save model and scaler to disk."""
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(model, MODEL_PATH)
    joblib.dump(scaler, SCALER_PATH)

    print(f"\nModel saved to: {MODEL_PATH}")
    print(f"Scaler saved to: {SCALER_PATH}")
    
    # Verify files
    model_size = os.path.getsize(MODEL_PATH) / 1024
    scaler_size = os.path.getsize(SCALER_PATH) / 1024
    print(f"   Model size: {model_size:.1f} KB")
    print(f"   Scaler size: {scaler_size:.1f} KB")


def test_prediction(model, scaler):
    """Test prediction with sample data."""
    print("\n" + "=" * 60)
    print("TESTING PREDICTION")
    print("=" * 60)
    
    # High-risk sample
    high_risk = np.array([[5, 5, 0, 0, 25, 1, 1, 2]])
    high_risk_scaled = scaler.transform(high_risk)
    pred_high = model.predict_proba(high_risk_scaled)[0, 1]
    print(f"High-risk sample: Prediction={model.predict(high_risk_scaled)[0]}, Dropout Prob={pred_high*100:.2f}%")
    
    # Low-risk sample
    low_risk = np.array([[45, 40, 1, 1, 19, 0, 0, 1]])
    low_risk_scaled = scaler.transform(low_risk)
    pred_low = model.predict_proba(low_risk_scaled)[0, 1]
    print(f"Low-risk sample:  Prediction={model.predict(low_risk_scaled)[0]}, Dropout Prob={pred_low*100:.2f}%")


if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("STUDENT DROPOUT PREDICTION MODEL TRAINING")
    print("   Gradient Boosting - Design Thinking Lab - RVCE")
    print("=" * 60)
    
    # Dataset path
    DATA_PATH = "data/dataset.csv"
    
    # Check if data exists
    if not os.path.exists(DATA_PATH):
        print(f"\nDataset not found at: {DATA_PATH}")
        print("Please download the dataset from Kaggle")
        exit(1)
    
    # Train
    X, y = load_and_preprocess_data(DATA_PATH)
    model, scaler = train_model(X, y)
    save_model(model, scaler)
    test_prediction(model, scaler)
    
    print("\n" + "=" * 60)
    print("TRAINING COMPLETE!")
    print("=" * 60)
    print("\nNext steps:")
    print("1. Update config.py to use: ml/saved_models/model_gb.joblib")
    print("2. Start the FastAPI backend: uvicorn app.main:app --reload")
    print("3. Start the frontend: cd frontend && npm run dev")
    print("4. Open http://localhost:3000")
