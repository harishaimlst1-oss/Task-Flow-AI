from fastapi import APIRouter
from app.models.schemas import SubtaskRequest, SubtaskResponse, EtaRequest, EtaResponse
from app.services.assignments import subdivide_task, predict_eta

router = APIRouter()

@router.post("/subdivide", response_model=SubtaskResponse)
def subdivide(payload: SubtaskRequest):
    subtasks = subdivide_task(payload.description)
    return SubtaskResponse(subtasks=subtasks)

@router.post("/eta", response_model=EtaResponse)
def eta(payload: EtaRequest):
    eta_hours = predict_eta(payload.task_complexity, payload.historical_hours)
    return EtaResponse(eta_hours=eta_hours)
