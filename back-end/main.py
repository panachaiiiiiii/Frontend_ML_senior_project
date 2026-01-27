from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests   # ✅ เพิ่มบรรทัดนี้

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def Hello():
    return {"Hello": "World"}

@app.post("/login")
async def login(request: Request):
    body = await request.json()
    access_token = body.get("access_token")

    if not access_token:
        return {"error": "No access token"}

    # ✅ ใช้ requests.get
    google_res = requests.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        headers={
            "Authorization": f"Bearer {access_token}"
        }
    )

    if google_res.status_code != 200:
        return {"error": "Invalid token"}

    user_info = google_res.json()

    return {
        "message": "Login successful",
        "user": {
            "email": user_info["email"],
            "name": user_info["name"],
            "picture": user_info["picture"]
        }
    }
