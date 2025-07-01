A web-based Resume Editor where users can upload, edit, enhance (mock AI), save, and download their resumes. Built with React.js frontend and FastAPI backend.

📁 Project Structure bash Copy Edit resume-editor/ ├── frontend/ # React.js app └── backend/ # FastAPI app 🚀 Setup Instructions ✅ Prerequisites Node.js & npm

Python 3.8+

pip (Python package installer)

1️⃣ Frontend Setup (React.js) bash Copy Edit

Go to frontend folder
cd frontend

Install dependencies
npm install

Start the frontend server
npm start App will run at: http://localhost:3000

2️⃣ Backend Setup (FastAPI) bash Copy Edit

Go to backend folder
cd backend

Create a virtual environment
python -m venv venv

Activate the virtual environment
Windows:
venv\Scripts\activate

macOS/Linux:
source venv/bin/activate

Install FastAPI and Uvicorn
pip install fastapi uvicorn python-multipart

Run the FastAPI backend
uvicorn main:app --reload Backend will run at: http://localhost:8000

🔌 API Endpoints POST /ai-enhance Enhances a given resume section using mock AI.

json Copy Edit Input: { "section": "summary", "content": "Experienced web developer..." } Output: { "enhanced_content": "🚀 Improved: Experienced web developer with a focus on performance..." } POST /save-resume Saves the full resume as JSON (mocked; saved to memory or disk).

json Copy Edit Input: { "resume": { "name": "John Doe", "summary": "..." } } Output: { "message": "Resume saved successfully!" }
