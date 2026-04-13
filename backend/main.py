import os
from dotenv import load_dotenv

# MUST LOAD UP .ENV BEFORE IMPORTING AI MODULES
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

from agent import DropoutAgent

app = FastAPI(title="AI Student Performance & Dropout Predictor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = DropoutAgent()

class StudentData(BaseModel):
    name: str
    roll: str
    semester: int
    sex: int
    attendance: int
    internal: int
    assignment: int
    backlog_count: int
    sgpa_history: List[float]
    feedback_text: str

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "modules": ["ml", "dl", "nlp", "llm"]
    }

@app.post("/api/predict")
def predict_student(data: StudentData):
    # Pass dict to agent
    result = agent.run_analysis(data.dict())
    return result
