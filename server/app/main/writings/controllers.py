from email import message
from typing import Annotated
from fastapi import APIRouter, Depends

from server.app.main.writings.services import WritingService
from .dto.response_dto import WritingsResponse, WritingResponse

router = APIRouter()


@router.get("/writings", response_model=WritingsResponse)
def get_writings(
    writing_service: Annotated[WritingService, Depends(WritingService)]
) -> WritingsResponse:
    return {"message": writing_service.get_writings()}


@router.get("/writings/{id}", response_model=WritingResponse)
def get_writing_by_id(id: int) -> WritingResponse:
    return "get_writing_by_id"


@router.post("/writings", response_model=WritingResponse)
def create_writing() -> WritingResponse:
    return "create_writing"


@router.put("/writings/{id}", response_model=WritingResponse)
def update_writing(id: int) -> WritingResponse:
    return "update_writing"


@router.delete("/writings/{id}")
def delete_writing(id: int) -> WritingResponse:
    return "delete_writing"
