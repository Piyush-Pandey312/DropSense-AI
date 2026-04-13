
# dl_module.py — Day 2 deliverable (Alok Kumar Dwivedi)
# Usage: from dl_module import predict_cgpa

import numpy as np
import joblib
from tensorflow.keras.models import load_model

SAVE_DIR = './saved_models'

_dl_model  = load_model(f'{SAVE_DIR}/dl_lstm_model.h5', compile=False)
_dl_scaler = joblib.load(f'{SAVE_DIR}/dl_scaler.pkl')

def predict_cgpa(sgpa_list):
    if len(sgpa_list) < 4:
        sgpa_list = ([sgpa_list[0]] * (4 - len(sgpa_list))) + list(sgpa_list)
    seq_input = np.array(sgpa_list[-4:]).reshape(1, -1)
    padded = np.zeros((1, 6))
    padded[0, :4] = seq_input[0]
    scaled_row = _dl_scaler.transform(padded)
    scaled_seq = scaled_row[0, :4].reshape(1, 4, 1)
    pred_scaled = float(_dl_model.predict(scaled_seq, verbose=0)[0][0])
    inv_row = np.zeros((1, 6))
    inv_row[0, 0] = pred_scaled
    pred_cgpa = float(_dl_scaler.inverse_transform(inv_row)[0][0])
    pred_cgpa = round(max(0.0, min(10.0, pred_cgpa)), 2)
    diff = sgpa_list[-1] - sgpa_list[0]
    trend = 'IMPROVING' if diff > 0.3 else 'DECLINING' if diff < -0.3 else 'STABLE'
    return {'predicted_cgpa': pred_cgpa, 'trend': trend}
