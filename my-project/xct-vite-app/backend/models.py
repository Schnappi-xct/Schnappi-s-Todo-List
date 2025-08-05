from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

# 关联表：多对多
todo_tag = Table(
    'todo_tag', Base.metadata,
    Column('todo_id', Integer, ForeignKey('todos.id')),
    Column('tag_id', Integer, ForeignKey('tags.id'))
)

class ToDo(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    tags = relationship("Tag", secondary=todo_tag, back_populates="todos")

class Tag(Base):
    __tablename__ = "tags"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    todos = relationship("ToDo", secondary=todo_tag, back_populates="tags")
