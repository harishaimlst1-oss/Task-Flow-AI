# Task-Flow-AI

Monorepo with a React + TypeScript frontend, Node.js + Express backend, and Python FastAPI ML service.

## Structure
- `frontend/` React + Vite + Tailwind + Zustand UI
- `backend/` Node.js + Express + TypeScript API
- `ml-service/` FastAPI ML service (TF-IDF matching + assignment helpers)
- `database/` PostgreSQL schema and seed guidance

## Quickstart

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

### ML Service
```bash
cd ml-service
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

### Database
```bash
psql -f database/schema.sql
```

## Configuration
Copy `.env.example` in each service and update values for local development.
