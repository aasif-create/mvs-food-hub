from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
from database import users_collection
from passlib.hash import bcrypt

app = FastAPI()

class SignupRequest(BaseModel):
    username: str
    email: EmailStr
    password: str

@app.get("/")
def root():
    return {"message": "MVS Food Hub API running"}

@app.post("/signup")
def signup(user: SignupRequest):
    try:
        doc = user.model_dump()
        doc["password"] = bcrypt.hash(user.password)
        result = users_collection.insert_one(doc)
        return {"message": "User registered successfully", "user_id": str(result.inserted_id)}
    except Exception as e:
        return {"error": str(e)}
