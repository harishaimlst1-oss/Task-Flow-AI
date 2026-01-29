from typing import List
import os
import random


def subdivide_task(description: str) -> List[str]:
    """
    Gemini 1.5 Flash subdivision stub.
    Replace with real API call if GEMINI_API_KEY is configured.
    """
    if os.getenv("GEMINI_API_KEY"):
        return [
            f"Clarify scope for: {description}",
            f"Implement core logic for: {description}",
            f"Validate output for: {description}",
        ]
    return [
        f"Define acceptance criteria for: {description}",
        f"Execute delivery steps for: {description}",
        f"Review and document: {description}",
    ]


def adaptive_skill_delta(score: float) -> float:
    return round(min(1.0, max(0.1, score)) * 0.25, 2)


def predict_eta(task_complexity: float, historical_hours: float) -> float:
    noise = random.uniform(-0.2, 0.2)
    return round(historical_hours * (1 + (task_complexity / 10)) * (1 + noise), 2)
