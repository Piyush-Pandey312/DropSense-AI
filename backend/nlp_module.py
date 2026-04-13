
# nlp_module.py — Day 3 deliverable (Arjun Pandey)
# Usage: from nlp_module import analyse_feedback

import torch
import spacy
from transformers import AutoTokenizer, AutoModelForSequenceClassification

SAVE_DIR = './saved_models'
NLP_MODEL_PATH = './nlp_model'

LABEL_MAP = {0: 'ACADEMIC', 1: 'FINANCIAL', 2: 'PERSONAL', 3: 'MENTAL_HEALTH'}
URGENCY_KEYWORDS = ['fail', 'urgent', 'drop', 'leave', 'hopeless', 'crisis', 'cannot', 'panic', 'quit', 'impossible']
CONCERN_WORDS = {
    'ACADEMIC': ['attendance', 'exam', 'fail', 'backlog', 'assignment', 'grade', 'subject'],
    'FINANCIAL': ['fee', 'money', 'scholarship', 'afford', 'payment', 'hostel'],
    'PERSONAL': ['family', 'roommate', 'relationship', 'friend', 'lonely'],
    'MENTAL_HEALTH': ['anxious', 'stress', 'depression', 'hopeless', 'sleep', 'panic'],
}

_tokenizer = AutoTokenizer.from_pretrained(NLP_MODEL_PATH, local_files_only=True)
_model_bert = AutoModelForSequenceClassification.from_pretrained(NLP_MODEL_PATH, local_files_only=True)
_nlp_spacy = spacy.load('en_core_web_sm')

def extract_keywords(text, concern_label):
    doc = _nlp_spacy(text.lower())
    base = CONCERN_WORDS.get(concern_label, [])
    found = [w for w in base if w in text.lower()]
    return found[:5] if found else [t.text for t in doc if not t.is_stop and t.pos_ in ('NOUN','VERB')][:4]

def analyse_feedback(text):
    enc = _tokenizer([text], padding=True, truncation=True, max_length=128, return_tensors='pt')
    with torch.no_grad():
        logits = _model_bert(**enc).logits
    pred_id = int(torch.argmax(logits))
    concern = LABEL_MAP[pred_id]
    urg_score = sum(1 for w in URGENCY_KEYWORDS if w in text.lower())
    urgency = 'IMMEDIATE' if urg_score >= 2 else 'MODERATE' if urg_score == 1 else 'LOW'
    keywords = extract_keywords(text, concern)
    return {'concern': concern, 'urgency': urgency, 'keywords': keywords}
