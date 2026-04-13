import sys
import json
from agent import DropoutAgent

agent = DropoutAgent()

test_data = {
    "name": "Integration Test Student",
    "roll": "9999",
    "semester": 4,
    "sex": 1,
    "attendance": 35,
    "internal": 25,
    "assignment": 30,
    "backlog_count": 4,
    "sgpa_history": [5.0, 4.2, 3.8],
    "feedback_text": "I feel extremely anxious and overwhelmed. I am failing multiple math classes and I don't know who to talk to."
}

print("Initiating full pipeline analysis...")
result = agent.run_analysis(test_data)

print("\n=== SYSTEM INTEGRATION REPORT ===")
print("\n[MODULE 1] ML Output (Risk):")
print(json.dumps(result['risk'], indent=2))

print("\n[MODULE 2] DL Output (CGPA):")
print(json.dumps(result['cgpa'], indent=2))

print("\n[MODULE 3] NLP Output (Sentiment & Keywords):")
print(json.dumps(result['nlp'], indent=2))

print(f"\n[MODULE 4] LLM Generator Output (Engine: {result['letter_source']}):")
print("-" * 40)
print(result['letter'])
print("-" * 40)
