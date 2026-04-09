from fastapi import FastAPI
from database import supabase
from routes.tasks import router

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Taskly API działa!"}

app.include_router(router)