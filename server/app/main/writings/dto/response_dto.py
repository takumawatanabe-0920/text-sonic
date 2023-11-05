from datetime import datetime
from typing import List, Union
from pydantic import BaseModel
from sqlalchemy import Column


class WritingDto(BaseModel):
    # id: Column[int]
    # title: Column[str]
    # description: Column[str]
    # created_at: Column[datetime]
    # updated_at: Column[datetime]

    id: int
    title: str
    description: str
    created_at: str
    updated_at: str


class WritingsResponse(BaseModel):
    message: List[WritingDto]


class WritingResponse(BaseModel):
    message: Union[WritingDto, None]


# OK or NG
class StatusResponse(BaseModel):
    message: str
