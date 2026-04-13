import joblib
import pandas as pd
import warnings
warnings.filterwarnings('ignore')

SAVE_DIR = './saved_models'
_ml_model = joblib.load(f'{SAVE_DIR}/ml_model.pkl')
_ml_scaler = joblib.load(f'{SAVE_DIR}/ml_scaler.pkl')
_ml_features = joblib.load(f'{SAVE_DIR}/ml_features.pkl')

feature_map_bad = {
    'reading_score': 10,
    'writing_score': 10,
    'math_score': 20,
    'ethnicity': 0,
    'parental_level_of_education': 2,
    'sex': 1
}

feature_map_good = {
    'reading_score': 95,
    'writing_score': 95,
    'math_score': 95,
    'ethnicity': 0,
    'parental_level_of_education': 2,
    'sex': 1
}

row_dict_bad = {f: feature_map_bad.get(f, 0) for f in _ml_features}
row_dict_good = {f: feature_map_good.get(f, 0) for f in _ml_features}

bad_class = int(_ml_model.predict(_ml_scaler.transform(pd.DataFrame([row_dict_bad])))[0])
good_class = int(_ml_model.predict(_ml_scaler.transform(pd.DataFrame([row_dict_good])))[0])

print("----- MODEL PREDICTIONS -----")
print("TERRIBLE PERFORMANCE RAW CLASS (10/100):", bad_class)
print("EXCELLENT PERFORMANCE RAW CLASS (95/100):", good_class)
