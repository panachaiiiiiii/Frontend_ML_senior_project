from fastapi import APIRouter, Request
from database.firebase import get_db
from pydantic import BaseModel
from services.google_auth import verify_google_token
from datetime import date
from .auth import create_token ,verify_token
from passlib.context import CryptContext
from firebase_admin import auth
from fastapi import HTTPException
from fastapi import Depends



pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

router = APIRouter()
db = get_db()
class Userinfo(BaseModel):
    first_name : str
    last_name : str
    sex : str
    birthday : date
class UserRegister(BaseModel):
    email : str
    password : str

@router.post("/register")
def register(UserRegister: UserRegister):
    try:
        # ✅ ส่ง password ตรง ๆ
        user = auth.create_user(
            email=UserRegister.email,
            password=UserRegister.password
        )

        uid = user.uid

        # เก็บข้อมูลผู้ใช้ใน Realtime DB
        user_ref = db.reference(f"users/{uid}")
        user_ref.set({
            "email": user.email,
            "role": "user",
            "login_from": "register"
        })
        token = create_token({"uid": uid})
        return {
            "status": 201,
            "token": token
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login/google")
async def login(request: Request):
    body = await request.json()
    access_token = body.get("access_token")
    user_info = verify_google_token(access_token)

    uid = user_info["sub"]
    user_ref = db.reference(f"users/{uid}")
    user = user_ref.get()
    token = create_token({"uid": uid,"login":True})
    if not user_ref.get():
        user_ref.set({
            "email": user_info["email"],
            "role": "user",
            "login_from": "google",
        })
        return {
            "token": token,
            "status": 201
        }
    if user and "birthday" and "sex" in user:
        return {
            "token": token,
            "status": 200
        }
    
    return {
        "token": token,
        "status": 201
    }


from fastapi import HTTPException

@router.put("/setupprofile")
def setupuser(
    Userinfo: Userinfo,
    user = Depends(verify_token)
):
    print(user)

    ref = db.reference(f"/users/{user['uid']}")

    if ref.get():
        ref.update({
            "first_name": Userinfo.first_name,
            "last_name": Userinfo.last_name,
            "birthday": Userinfo.birthday.isoformat(),
            "sex": Userinfo.sex
        })
        return {"status": 202}

    return {"status": 200}




@router.get("/guest")
def LoginGuest():
    token = create_token({"uid": "Guest"})
    return {
            "token": token,
            "status": 200
        }