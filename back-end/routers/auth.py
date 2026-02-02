from fastapi import APIRouter
from database.firebase import get_db
from jose import jwt,JWTError
from datetime import datetime, timedelta,date
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
import os
from pydantic import BaseModel

load_dotenv()

router = APIRouter()
db = get_db()
security = HTTPBearer()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
class Userinfo(BaseModel):
    uid : str
    email: str
    first_name : str
    last_name : str
    sex : str
    role: str
    birthday : date
class Token(BaseModel):
    token:str

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(payload)
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
def create_token(data: dict):
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(hours=1)
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token


@router.get("/userinfo")
def userinfo(user: dict = Depends(verify_token)):
    return {"user": user}