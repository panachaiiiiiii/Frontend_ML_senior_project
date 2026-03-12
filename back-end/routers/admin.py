from fastapi import APIRouter
from fastapi import HTTPException
from firebase_admin import auth
from database.firebase import get_db
from pydantic import BaseModel
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
# GET HISTORY USERS
# =========================
@router.get("/admin/history/{uid}")
def getdata(uid:str):
    ref = db.reference(f"/users/{uid}/results")
    data = ref.get()
    print("UID : ",{uid})
    print("data is ",data)
    return {
        "data":data,
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


