from fastapi import APIRouter 
from database import supabase
from models import Task

router = APIRouter()
@router.get("/tasks")
def get_tasks():
    return {"message": "Lista zadań"}
