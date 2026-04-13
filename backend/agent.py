import os

try:
    from ml_module import predict_dropout
    ML_AVAILABLE = True
except Exception as e:
    ML_AVAILABLE = False
    print(f"ML module not loaded: {e}")

try:
    from dl_module import predict_cgpa
    DL_AVAILABLE = True
except Exception as e:
    DL_AVAILABLE = False
    print(f"DL module not loaded: {e}")

try:
    from nlp_module import analyse_feedback
    NLP_AVAILABLE = True
except Exception as e:
    NLP_AVAILABLE = False
    print(f"NLP module not loaded: {e}")

try:
    from llm_module import generate_counsellor_letter
    LLM_AVAILABLE = True
except Exception as e:
    LLM_AVAILABLE = False
    print(f"LLM module not loaded: {e}")

class DropoutAgent:
    def __init__(self):
        self.hf_token = os.environ.get("HF_TOKEN")
        self.gemini_api_key = os.environ.get("GEMINI_API_KEY")

    def run_analysis(self, data: dict):
        # Default results
        ml_result = {"risk_label": "LOW", "risk_score": 0.0}
        dl_result = {"predicted_cgpa": 0.0, "trend": "STABLE"}
        nlp_result = {"concern": "UNKNOWN", "urgency": "LOW", "keywords": []}
        llm_result = "AI modules not available to generate a custom letter."
        letter_source = "Rule-based"

        if ML_AVAILABLE:
            try:
                sgpa_history = data.get("sgpa_history", [])
                sgpa_avg = sum(sgpa_history) / max(1, len(sgpa_history))
                ml_result = predict_dropout(
                    attendance=data.get("attendance", 0),
                    internal=data.get("internal", 0),
                    assignment=data.get("assignment", 0),
                    sgpa_avg=sgpa_avg,
                    backlog_count=data.get("backlog_count", 0),
                    sex=data.get("sex", 1)
                )
            except Exception as e:
                print(f"ML prediction failed: {e}")

        if DL_AVAILABLE:
            try:
                dl_result = predict_cgpa(data.get("sgpa_history", []))
            except Exception as e:
                print(f"DL prediction failed: {e}")

        if NLP_AVAILABLE:
            try:
                nlp_result = analyse_feedback(data.get("feedback_text", ""))
            except Exception as e:
                print(f"NLP prediction failed: {e}")

        if LLM_AVAILABLE:
            try:
                llm_out = generate_counsellor_letter(
                    name=data.get("name", "Student"),
                    semester=data.get("semester", 1),
                    risk=ml_result,
                    cgpa_result=dl_result,
                    nlp_result=nlp_result
                )
                if isinstance(llm_out, tuple) and len(llm_out) == 2:
                    llm_result, letter_source = llm_out
                else:
                    llm_result = llm_out.get("letter", "") if isinstance(llm_out, dict) else str(llm_out)
                    letter_source = llm_out.get("source", "Unknown") if isinstance(llm_out, dict) else "Unknown"
            except Exception as e:
                print(f"LLM generation failed: {e}")
                llm_result = f"Dear {data.get('name')}, we have noticed some academic concerns. Please visit the counsellor."
                letter_source = "Fallback"

        return {
            "name": data.get("name"),
            "roll": data.get("roll"),
            "risk": ml_result,
            "cgpa": dl_result,
            "nlp": nlp_result,
            "letter": llm_result,
            "letter_source": letter_source
        }
