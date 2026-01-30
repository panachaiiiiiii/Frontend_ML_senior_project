from fastapi import APIRouter, Request
from services.google_auth import verify_google_token
from database.firebase import get_db


router = APIRouter()
db = get_db()

@router.post("/login/google")
async def login(request: Request):
    body = await request.json()
    access_token = body.get("access_token")

    user_info = verify_google_token(access_token)
    uid = user_info["sub"]
    user_ref = db.reference(f"users/{uid}")
    
    user = user_ref.get()
    print(user)
    if not user_ref.get():
        user_ref.set({
            "email": user_info["email"],
            "role": "user",
            "login_from": "google",
            
        })
        return {
            "uid": uid,
            "status": 201
        }
    if user and "birthday" and "sex" in user:
        return {
            "uid": uid,
            "status": 200
        }
    return {
        "uid": uid,
        "status": 201
    }
