from email import message
from typing import Annotated
from fastapi import APIRouter, Depends
from server.app.main.writings.dto.request_dto import (
    CreateWritingBodyDto,
    UpdateWritingBodyDto,
)

from server.app.main.writings.services import WritingService
from .dto.response_dto import StatusResponse, WritingsResponse, WritingResponse

router = APIRouter()


@router.get("/writings", response_model=WritingsResponse)
def get_writings(
    writing_service: Annotated[WritingService, Depends(WritingService)]
) -> WritingsResponse:
    return writing_service.get_writings()


@router.get("/writings/{id}", response_model=WritingResponse)
def get_writing_by_id(
    id: int, writing_service: Annotated[WritingService, Depends(WritingService)]
) -> WritingResponse:
    return writing_service.get_writing_by_id(id)


@router.post("/writings", response_model=StatusResponse)
def create_writing(
    reqBody: CreateWritingBodyDto,
    writing_service: Annotated[WritingService, Depends(WritingService)],
) -> StatusResponse:
    return writing_service.create_writing(reqBody)


@router.put("/writings/{id}", response_model=StatusResponse)
def update_writing(
    id: int,
    reqBody: UpdateWritingBodyDto,
    writing_service: Annotated[WritingService, Depends(WritingService)],
) -> StatusResponse:
    return writing_service.update_writing(id, reqBody)


@router.delete("/writings/{id}")
def delete_writing(
    id: int, writing_service: Annotated[WritingService, Depends(WritingService)]
) -> StatusResponse:
    return writing_service.delete_writing(id)
