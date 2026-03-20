from fastapi import APIRouter, UploadFile, File, Depends, Form, HTTPException
from PIL import Image
from core.ml import predict_image, MODEL_MAP
from database.firebase import get_db
from datetime import datetime
from .auth import verify_token

db = get_db()

router = APIRouter(prefix="/predict", tags=["predict"])


@router.post("/")
async def predict(
    file: UploadFile = File(...),
    model_name: str = Form(...),
    user=Depends(verify_token),
):
    # ✅ validate จาก MODEL_MAP (ดีที่สุด)
    if model_name not in MODEL_MAP:
        raise HTTPException(status_code=400, detail="Invalid model")

    image = Image.open(file.file)

    try:
        result = predict_image(image, model_name)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # ✅ firebase
    user_ref = db.reference(f"/users/{user['uid']}")
    user_data = user_ref.get()

    if user_data:
        ref = db.reference(f"/users/{user['uid']}/results")
        new_ref = ref.push()

        new_ref.set({
            "prediction": result,
            "model": model_name,
            "created_at": datetime.now().isoformat()
        })

    return {
        "result": result,
        "model": model_name
    }