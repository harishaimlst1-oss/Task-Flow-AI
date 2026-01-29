from fastapi import FastAPI
from app.routes.matching import router as matching_router
from app.routes.assignments import router as assignments_router

app = FastAPI(title="Task Flow AI ML Service")

app.include_router(matching_router, prefix="/matching")
app.include_router(assignments_router, prefix="/assignments")

@app.get("/health")
def health():
    return {"status": "ok"}
