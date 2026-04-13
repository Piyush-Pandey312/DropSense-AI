# AI Student Performance & Dropout Predictor

## Overview
The AI Student Performance & Dropout Predictor is a full-stack application designed to help faculty and educational institutions identify students at risk of dropping out. It provides a comprehensive dashboard that analyzes student data, forecasts future academic performance, processes behavioral/feedback text, and generates actionable insights including personalized counselor letters.

## Features
- **Comprehensive Risk Assessment**: Combines multiple AI disciplines to evaluate student risk.
- **Machine Learning (ML)**: Baseline risk prediction using classical models (e.g., Random Forest/XGBoost).
- **Deep Learning (DL)**: Sequential data analysis (e.g., SGPA history) to forecast future performance trends.
- **Natural Language Processing (NLP)**: Sentiment and concern extraction from raw text such as teacher feedback.
- **Large Language Models (LLM)**: Synthesis of analytical data into personalized recommendations and counselor letters.
- **Modern Faculty Dashboard**: An interactive, professional UI built with Next.js and Tailwind CSS.

## Architecture

This project is separated into a frontend and a backend:

*   **`frontend/`**: A Next.js application providing the web dashboard interface.
*   **`backend/`**: A Python FastAPI backend orchestrating the various AI modules and exposing REST API endpoints.

## Prerequisites
- Node.js (v18+)
- Python (v3.8+)
- Access to necessary API keys for LLM integration (e.g., Google Gemini or OpenAI)

## Getting Started

### 1. Setting up the Backend
Navigate to the backend directory, install the dependencies, and configure the environment variables.

```bash
cd backend

# Create and activate a virtual environment (optional but recommended)
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Install requirements
pip install -r requirements.txt
```
Create a `.env` file based on `.env.example` in the `backend/` folder and add your required API keys.

To run the backend server locally:
```bash
uvicorn main:app --reload
```
The API will be available at `http://localhost:8000`.

### 2. Setting up the Frontend
Navigate to the frontend directory, install the necessary npm packages, and run the development server.

```bash
cd frontend

# Install Node modules
npm install
```
Create a `.env` file based on the `.env.example` file in the `frontend/` directory if necessary.

To run the Next.js development server:
```bash
npm run dev
```
The dashboard will be available at `http://localhost:3000`.

## Contact / Contributors
Developed for predicting and improving student success.
