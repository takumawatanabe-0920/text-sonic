from pydantic import BaseModel
from typing import List


class WritingBodyDto(BaseModel):
    title: str
    description: str


class CreateWritingBodyDto(WritingBodyDto):
    pass


class UpdateWritingBodyDto(WritingBodyDto):
    pass


class WritingDto(BaseModel):
    id: int
    title: str
    description: str
    created_at: str
    updated_at: str


class WritingsResponse(BaseModel):
    message: List[WritingDto]


class WritingResponse(BaseModel):
    message: WritingDto
