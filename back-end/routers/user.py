from fastapi import APIRouter
from database.firebase import get_db
from pydantic import BaseModel
from datetime import date
router = APIRouter()
db = get_db()

class Userinfo(BaseModel):
    uid : str
    first_name : str
    last_name : str
    sex : str
    birthday : date

@router.post("/add-user")
def add_user(user: dict):
    ref = db.reference("/users")
    ref.push(user)
    return {"status": "user added"}

@router.put("/setupprofile")
def setupuser(Userinfo: Userinfo):
    ref = db.reference(f"/users/{Userinfo.uid}")
    print(ref.get())
    if ref.get() :
        ref.update({
            "first_name" : Userinfo.first_name,
            "last_name" : Userinfo.last_name,
            "birthday" : Userinfo.birthday.isoformat(),
            "sex" : Userinfo.sex
        })
        return {"status" : 202}
    return {"status" : 200}

