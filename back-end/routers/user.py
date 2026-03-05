from fastapi import APIRouter, Depends, HTTPException
from database.firebase import get_db
from pydantic import BaseModel
from datetime import date
from .auth import create_token, verify_token
from firebase_admin import auth
from typing import Optional

router = APIRouter()
db = get_db()


class UpdateUser(BaseModel):
    email: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    sex: Optional[str] = None
    birthday: Optional[str] = None
    role: Optional[str] = None


class Userinfo(BaseModel):
    first_name: str
    last_name: str
    sex: str
    birthday: date


# =========================
# GET USER PROFILE
# =========================
@router.get("/setting")
def getdata(user=Depends(verify_token)):

    ref = db.reference(f"/users/{user['uid']}")
    data = ref.get()

    if data:
        return {
            "user": data,
            "status": 202
        }

    return {"status": 400}


# =========================
# DELETE USER
# =========================
@router.delete("/user/{uid}")
def delete_user(uid: str):

    try:
        auth.delete_user(uid)

        ref = db.reference(f"/users/{uid}")
        ref.delete()

        return {
            "status": 200,
            "detail": "User deleted"
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# =========================
# UPDATE USER (ADMIN)
# =========================
@router.put("/user/{uid}")
def update_user(uid: str, body: UpdateUser):

    ref = db.reference(f"/users/{uid}")
    data = ref.get()

    if not data:
        return {
            "status": 404,
            "message": "User not found"
        }

    update_data = body.dict(exclude_unset=True)

    if update_data:
        ref.update(update_data)

    return {
        "status": 200,
        "message": "updated"
    }


# =========================
# GUEST LOGIN
# =========================
@router.get("/guest")
def LoginGuest():

    token = create_token({
        "uid": "Guest"
    })

    return {
        "token": token,
        "status": 200
    }


# =========================
# GET ALL USERS
# =========================
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
            "lastname": value.get("last_name", ""),
            "gender": value.get("sex", ""),
            "birthday": value.get("birthday", ""),
            "login_from": value.get("login_from", ""),
            "role": value.get("role", "user")
        })

    return {
        "status": 200,
        "users": users
    }


# =========================
# UPDATE OWN PROFILE
# =========================
@router.put("/setting")
def update_profile(
    data: UpdateUser,
    user=Depends(verify_token)
):

    uid = user["uid"]

    ref = db.reference(f"/users/{uid}")

    if not ref.get():
        raise HTTPException(status_code=404, detail="User not found")

    update_data = data.dict(exclude_unset=True)

    if update_data:
        ref.update(update_data)

    return {
        "status": 201,
        "detail": "updated"
    }