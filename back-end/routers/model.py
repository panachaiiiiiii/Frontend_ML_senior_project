from fastapi import APIRouter


router = APIRouter()

MODEL_STATUS = {
    "modelA": True,
    "modelB": False,
}
@router.get("/models")
def get_models():
    return {
        "models": [
            {"name": name, "enabled": status}
            for name, status in MODEL_STATUS.items()
        ]
    }
    
from pydantic import BaseModel

class ModelToggle(BaseModel):
    name: str
    enabled: bool

@router.put("/models/toggle")
def toggle_model(data: ModelToggle):
    if data.name not in MODEL_STATUS:
        return {"status": 400, "detail": "Model not found"}

    MODEL_STATUS[data.name] = data.enabled

    return {"status": 200}