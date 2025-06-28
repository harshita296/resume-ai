# File: /backend/main.py

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai

GEMINI_API_KEY = "AIzaSyB1Z1hvnaryed99UZZRjU39NpSqE5Z55m0"

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI()

# Allow all CORS requests (adjust in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input models
class AIEnhanceRequest(BaseModel):
    section: str
    content: str

class ResumeData(BaseModel):
    name: str
    summary: str
    experience: str
    education: str
    skills: str

# In-memory storage
stored_resume = {}

# POST /ai-enhance
@app.post("/ai-enhance")
async def ai_enhance(data: AIEnhanceRequest):
    try:
        model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")
        prompt = f"""Improve the following resume section titled '{data.section}'.

Content:
\"\"\"
{data.content}
\"\"\"

Return the improved version only.
"""
        response = model.generate_content(prompt)
        enhanced = response.text.strip()
        return {"enhanced_content": enhanced}
    except Exception as e:
        return {"enhanced_content": f"[AI Error]{data.content}"}

# POST /save-resume
@app.post("/save-resume")
async def save_resume(data: ResumeData):
    global stored_resume
    stored_resume = data.dict()
    return {"message": "Resume saved successfully."}

# GET /get-resume
@app.get("/get-resume")
async def get_resume():
    return stored_resume
