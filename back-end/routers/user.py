from fastapi import APIRouter, Request
from database.firebase import get_db
from pydantic import BaseModel

from datetime import date
from .auth import create_token ,verify_token

from firebase_admin import auth
from fastapi import HTTPException
from fastapi import Depends
from typing import Dict
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import HTTPException
security = HTTPBearer()

router = APIRouter()
db = get_db()
class UpdateUser(BaseModel):
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    sex: str | None = None
    birthday: str | None = None
    role: str | None = None
class Userinfo(BaseModel):
    first_name : str
    last_name : str
    sex : str
    birthday : date


@router.get("/setting")
def getdata(user = Depends(verify_token)):
    ref = db.reference(f"/users/{user['uid']}")
    
    if ref.get():
        return{
            "user":ref.get(),
            "status":202
        }
    return{"status":400}

@router.delete("/user/{uid}")
def delete_user(uid: str):
    try:
        # 🔥 ลบจาก Firebase Auth
        auth.delete_user(uid)

        # 🔥 ลบจาก Realtime DB
        ref = db.reference(f"/users/{uid}")
        ref.delete()

        return {
            "status": 200,
            "detail": "User deleted"
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.put("/user/{uid}")
def update_user(uid: str, body: dict):
    ref = db.reference(f"/users/{uid}")

    if not ref.get():
        return {"status": 404, "message": "User not found"}

    ref.update({
        "first_name": body.get("name", ""),
        "sex": body.get("gender", ""),
        "role": body.get("role", "")
    })

    return {"status": 200, "message": "updated"}

@router.get("/guest")
def LoginGuest():
    token = create_token({"uid": "Guest"})
    return {
            "token": token,
            "status": 200
        }

@router.get("/user")
def get_all_users():
    ref = db.reference("/users")
    data = ref.get()

    if not data:
        return {
            "status": 200,
            "users": []
        }

    users = []

    for uid, value in data.items():
        users.append({
            "uid": uid,
            "email": value.get("email", ""),
            "name": value.get("first_name", ""),
            "lastname": value.get("last_name",""),
            "gender": value.get("sex", ""),
            "birthday": value.get("birthday", ""),
            "login_from": value.get("login_from", ""),
            "role": value.get("role", "user")
        })

    return {
        "status": 200,
        "users": users
    }


@router.put("/setting")
def update_profile(
    data: Dict,
    user = Depends(verify_token)
):
    uid = user["uid"]

    ref = db.reference(f"/users/{uid}")

    if not ref.get():
        raise HTTPException(status_code=404, detail="User not found")

    # update เฉพาะ field ที่ส่งมา
    ref.update(data)

    return {
        "status": 201,
        "detail": "updated"
    }