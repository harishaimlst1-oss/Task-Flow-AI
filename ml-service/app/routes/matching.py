from fastapi import APIRouter
from app.models.schemas import MatchRequest, MatchResponse
from app.services.matching import best_match

router = APIRouter()

@router.post("/tfidf", response_model=MatchResponse)
def tfidf_match(payload: MatchRequest):
    candidates = [(c.user_id, c.skills) for c in payload.candidates]
    result = best_match(payload.description, candidates)
    if result is None:
        return MatchResponse(task_id=payload.task_id, best_user_id="", score=0.0, rationale="No candidates")
    user_id, score, rationale = result
    return MatchResponse(task_id=payload.task_id, best_user_id=user_id, score=score, rationale=rationale)
