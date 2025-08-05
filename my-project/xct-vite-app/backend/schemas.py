from pydantic import BaseModel
from typing import List

class TagBase(BaseModel):
    name: str

class ToDoBase(BaseModel):
    title: str
    description: str

class ToDoCreate(ToDoBase):
    tags: List[str] = []

class ToDoResponse(ToDoBase):
    id: int
    tags: List[TagBase] = []

    class Config:
        orm_mode = True
