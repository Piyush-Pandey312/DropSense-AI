import os 
from openai import OpenAI 
from google import genai as google_genai  

# ── Config ───────────────────────────────────────────────────────────── 
HF_TOKEN    = os.getenv('HF_TOKEN', '') 
GEMINI_KEY  = os.getenv('GEMINI_API_KEY', '') 
HF_MODEL    = "Qwen/Qwen2.5-7B-Instruct" 
GEMINI_MODEL= "gemini-2.5-flash" 

hf_client = OpenAI(base_url="https://router.huggingface.co/v1", api_key=HF_TOKEN) if HF_TOKEN else None
gemini_client = google_genai.Client(api_key=GEMINI_KEY) if GEMINI_KEY else None

SYSTEM = """You are an academic counsellor. Write a formal 4-sentence counselling 
letter. Reference actual student data. End with 2 specific action items.""" 

def build_prompt(name, semester, risk, cgpa_result, nlp_result): 
    kw = ", ".join(nlp_result.get("keywords", [])) 
    return f"""Student: {name} | Semester: {semester} 
Risk: {risk["risk_label"]} ({risk["risk_score"]:.0%}) | CGPA: {cgpa_result["predicted_cgpa"]} ({cgpa_result["trend"]}) 
Concern: {nlp_result["concern"]} | Urgency: {nlp_result["urgency"]} | Issues: {kw} 
Write a formal 4-sentence counselling letter. End with 2 action items.""" 

def generate_counsellor_letter(name, semester, risk, cgpa_result, nlp_result): 
    prompt = build_prompt(name, semester, risk, cgpa_result, nlp_result) 
    
    if hf_client:
        try: 
            r = hf_client.chat.completions.create( 
                model=HF_MODEL, 
                messages=[{"role":"system","content":SYSTEM},{"role":"user","content":prompt}], 
                max_tokens=300, temperature=0.4) 
            return {"letter": r.choices[0].message.content.strip(), "source": "HuggingFace"} 
        except Exception as e: 
            print(f"HF Error: {e}")
            pass 
            
    if gemini_client:
        try: 
            r = gemini_client.models.generate_content( 
                model=GEMINI_MODEL, contents=SYSTEM+"\n\n"+prompt, 
                config=google_genai.types.GenerateContentConfig(temperature=0.4, max_output_tokens=300)) 
            return {"letter": r.text.strip(), "source": "Gemini"} 
        except Exception as e:
            print(f"Gemini Error: {e}")
            pass 
            
    return {"letter": (f"Dear {name}, your academic record shows {risk['risk_label']} dropout risk " 
                       f"with predicted CGPA {cgpa_result['predicted_cgpa']} ({cgpa_result['trend']}). " 
                       f"Concern: {nlp_result['concern']} ({nlp_result['urgency']}). " 
                       f"Action 1: Visit counselling office. Action 2: Clear all backlogs this week."), 
            "source": "Rule-based"} 
