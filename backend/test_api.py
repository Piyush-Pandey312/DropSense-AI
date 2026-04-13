import requests

url = "http://localhost:8000/api/predict"
payload = {
    "name": "Rahul Kumar",
    "roll": "21CS042",
    "semester": 4,
    "sex": 1,
    "attendance": 52,
    "internal": 28,
    "assignment": 40,
    "backlog_count": 2,
    "sgpa_history": [7.2, 6.8, 6.1, 5.9],
    "feedback_text": "I am failing exams and have very low attendance due to stress"
}

try:
    response = requests.post(url, json=payload)
    print("Status Code:", response.status_code)
    print("Response JSON:")
    print(response.json())
except Exception as e:
    print("Error calling API:", e)
