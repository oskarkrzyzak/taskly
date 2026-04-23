from fastapi import APIRouter, Header, HTTPException
from database import supabase
from models import Task

router = APIRouter()

def get_user_id(authorization: str = Header(None)) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.split(" ")[1]
    result = supabase.auth.get_user(token)
    if not result.user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return result.user.id

@router.get("/tasks")
def get_tasks(authorization: str = Header(None)):
    user_id = get_user_id(authorization)
    return supabase.table("tasks").select("*").eq("user_id", user_id).execute()

@router.post("/tasks")
def create_task(task: Task, authorization: str = Header(None)):
    user_id = get_user_id(authorization)
    data = task.model_dump(mode="json", exclude={"id"})
    data["user_id"] = user_id
    return supabase.table("tasks").insert(data).execute()

@router.put("/tasks/{task_id}")
def update_task(task_id: int, task: Task, authorization: str = Header(None)):
    user_id = get_user_id(authorization)
    data = task.model_dump(mode="json", exclude={"id"})
    data["user_id"] = user_id
    return supabase.table("tasks").update(data).eq("id", task_id).eq("user_id", user_id).execute()

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, authorization: str = Header(None)):
    user_id = get_user_id(authorization)
    return supabase.table("tasks").delete().eq("id", task_id).eq("user_id", user_id).execute()
