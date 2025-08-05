from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Todo, Tag
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = None
    tags: List[str] = []

class TodoOut(BaseModel):
    id: int
    title: str
    description: Optional[str]
    tags: List[str]

    class Config:
        orm_mode = True

@router.post("/todos", response_model=TodoOut)
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    db_tags = []
    for tag_name in todo.tags:
        tag = db.query(Tag).filter(Tag.name == tag_name).first()
        if not tag:
            tag = Tag(name=tag_name)
        db_tags.append(tag)
    db_todo = Todo(title=todo.title, description=todo.description, tags=db_tags)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

@router.get("/todos", response_model=List[TodoOut])
def read_todos(tag: Optional[str] = None, keyword: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Todo)
    if tag:
        query = query.join(Todo.tags).filter(Tag.name == tag)
    if keyword:
        query = query.filter(Todo.title.contains(keyword) | Todo.description.contains(keyword))
    return query.all()

@router.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.query(Todo).get(todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(todo)
    db.commit()
    return {"detail": "Deleted"}
