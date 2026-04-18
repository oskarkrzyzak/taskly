from pydantic import BaseModel
from typing import Optional
from datetime import date, time

class Task(BaseModel):
    id: Optional[int] = None
    title: str
    description: Optional[str] = None
    status: bool
    user_id: Optional[str] = None
    date: date
    time: Optional[str] = None
    color: Optional[str] = None
    priority: Optional[str] = None