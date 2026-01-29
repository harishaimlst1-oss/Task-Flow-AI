from pydantic import BaseModel, Field
from typing import List

class Candidate(BaseModel):
    user_id: str
    skills: List[str]

class MatchRequest(BaseModel):
    task_id: str
    description: str
    candidates: List[Candidate]

class MatchResponse(BaseModel):
    task_id: str
    best_user_id: str
    score: float
    rationale: str

class SubtaskRequest(BaseModel):
    description: str

class SubtaskResponse(BaseModel):
    subtasks: List[str]

class EtaRequest(BaseModel):
    task_complexity: float = Field(ge=0.1, le=10.0)
    historical_hours: float = Field(ge=0.1)

class EtaResponse(BaseModel):
    eta_hours: float
