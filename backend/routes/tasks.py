from fastapi import APIRouter 
from database import supabase
from models import Task

router = APIRouter()
@router.get("/tasks")
def get_tasks():
    return supabase.table("tasks").select("*").execute()

@router.post("/tasks")
def create_task(task: Task):
    return supabase.table("tasks").insert(task.model_dump(mode="json", exclude={"id"})).execute()