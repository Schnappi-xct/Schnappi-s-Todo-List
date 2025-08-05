from sqlalchemy.orm import Session
from models import ToDo, Tag
from schemas import ToDoCreate

def create_todo(db: Session, todo: ToDoCreate):
    db_todo = ToDo(title=todo.title, description=todo.description)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo
