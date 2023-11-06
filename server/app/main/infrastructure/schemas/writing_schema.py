from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from sqlalchemy import Column


class WritingBase(BaseModel):
    title: str
    description: str


class WritingGet(BaseModel):
    id: int
    title: str
    description: str
    created_at: str
    updated_at: str

    class Config:
        orm_mode = True


class WritingCreate(WritingBase):
    pass


class WritingUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


class Writing(WritingBase):
    class Config:
        orm_mode = True
