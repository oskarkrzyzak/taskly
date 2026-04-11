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

@router.put("/tasks/{task_id}")
def update_task(task_id: int, task: Task):
    return supabase.table("tasks").update(task.model_dump(mode="json", exclude={"id"})).eq("id", task_id).execute()

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    return supabase.table("tasks").delete().eq("id", task_id).execute()