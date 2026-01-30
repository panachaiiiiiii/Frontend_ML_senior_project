from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import user, auth

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "FastAPI + Firebase RTDB is working"}

app.include_router(user.router)
app.include_router(auth.router)
