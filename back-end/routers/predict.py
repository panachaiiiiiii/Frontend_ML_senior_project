from fastapi import APIRouter, UploadFile, File
from PIL import Image
from core.ml import predict_image
from database.firebase import get_db
from fastapi import Depends
from datetime import datetime
from .auth import create_token ,verify_token
db = get_db()
router = APIRouter(prefix="/predict", tags=["predict"])
now = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
@router.post("/")
async def predict(file: UploadFile = File(...),user = Depends(verify_token)):
    image = Image.open(file.file)
    result = predict_image(image)

    user_ref = db.reference(f"/users/{user['uid']}")
    user_data = user_ref.get()

    ref = db.reference(f"/users/{user['uid']}/results")
    new_ref = ref.push()
    if user_data:
        new_ref.set({
            "prediction": result,
            "created_at": datetime.now().isoformat()
        })
       

    return result