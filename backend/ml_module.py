
# ml_module.py — Day 1 deliverable (Updated Production Version)

import numpy as np
import pandas as pd
import joblib
import os

# ── Config ────────────────────────────────────────────
SAVE_DIR = os.getenv("ML_SAVE_DIR", "./saved_models")

RISK_LABELS = {0: 'LOW', 1: 'MEDIUM', 2: 'HIGH'}

# ── Load artifacts safely ─────────────────────────────
try:
    _ml_model = joblib.load(os.path.join(SAVE_DIR, "ml_model.pkl"))
    _ml_scaler = joblib.load(os.path.join(SAVE_DIR, "ml_scaler.pkl"))
    _ml_features = joblib.load(os.path.join(SAVE_DIR, "ml_features.pkl"))
except Exception as e:
    raise RuntimeError(f"❌ Failed to load model files from {SAVE_DIR}: {e}")


def predict_dropout(attendance, internal, assignment, sgpa_avg, backlog_count, sex=1):
    """
    Predict student dropout risk.

    Args:
        attendance (0–100)
        internal (0–100)
        assignment (0–100)
        sgpa_avg (0–10)
        backlog_count (>=0)
        sex (1=Male, 0=Female)

    Returns:
        dict: {'risk_label': str, 'risk_score': float}
    """

    # ── Input validation ───────────────────────────────
    attendance = np.clip(attendance, 0, 100)
    internal = np.clip(internal, 0, 100)
    assignment = np.clip(assignment, 0, 100)
    sgpa_avg = np.clip(sgpa_avg, 0, 10)
    backlog_count = max(0, backlog_count)

    # ── Feature mapping (best possible alignment) ──────
    feature_map = {
        'reading_score': internal,
        'writing_score': assignment,
        'math_score': sgpa_avg * 10,
        'ethnicity': 0,
        'parental_level_of_education': 2,
        'sex': sex
    }

    # ── Build DataFrame (fixes sklearn warning) ────────
    row_dict = {f: feature_map.get(f, 0) for f in _ml_features}
    row_df = pd.DataFrame([row_dict])

    # ── Scale ─────────────────────────────────────────
    row_scaled = _ml_scaler.transform(row_df)

    # ── Predict ───────────────────────────────────────
    pred_class = int(_ml_model.predict(row_scaled)[0])

    # ── Probability ───────────────────────────────────
    if hasattr(_ml_model, 'predict_proba'):
        proba = _ml_model.predict_proba(row_scaled)[0]
        risk_score = float(np.max(proba))
    else:
        risk_score = 0.75

    # ── Expert Rules Overlay (For Custom Form Inputs) ──
    # Since the original dataset lacked 'attendance' and 'backlogs',
    # we inject their real-world significance via an expert overlay system.
    if attendance < 50 or backlog_count >= 3 or sgpa_avg < 4.5:
        pred_class = 2  # HIGH
        risk_score = max(0.85, risk_score)
    elif attendance < 75 or backlog_count >= 1 or sgpa_avg < 6.0:
        pred_class = max(1, pred_class) # Minimum MEDIUM
        risk_score = max(0.60, risk_score)

    return {
        'risk_label': RISK_LABELS.get(pred_class, "UNKNOWN"),
        'risk_score': round(risk_score, 2)
    }
