from fastapi import FastAPI
from database import supabase

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Taskly API dziala"}