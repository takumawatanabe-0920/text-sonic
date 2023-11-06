from fastapi import Depends
from app.main.infrastructure.schemas.writing_schema import (
    WritingCreate,
    WritingGet,
    WritingUpdate,
)
from typing import List, Optional
from app.main.writings.dto.request_dto import CreateWritingBodyDto
from app.main.writings.dto.request_dto import UpdateWritingBodyDto
from app.main.repository.writing_repository import (
    BaseWritingRepository,
    create_writing_repository,
)
from app.main.writings.dto.response_dto import (
    StatusResponse,
    WritingsResponse,
    WritingResponse,
    WritingDto,
)
from app.core.log.logger import logger


class WritingService:
    def __init__(
        self,
        writing_repository: BaseWritingRepository = Depends(create_writing_repository),
    ):
        self.__writing_repository = writing_repository

    def get_writings(self) -> WritingsResponse:
        writings = self.__writing_repository.get_all()
        return self.__convert_list_response(writings)

    def get_writing_by_id(self, id: str) -> WritingResponse:
        writing = self.__writing_repository.get_by_id(id)
        if not writing:
            return WritingResponse(message=None)

        return WritingResponse(
            message=WritingDto(
                id=writing.id,
                title=writing.title,
                description=writing.description,
                created_at=writing.created_at,
                updated_at=writing.updated_at,
            )
        )

    def create_writing(self, writing: CreateWritingBodyDto) -> StatusResponse:
        try:
            self.__writing_repository.save(
                WritingCreate(title=writing.title, description=writing.description)
            )
            return StatusResponse(message="OK")
        except Exception as e:
            logger.error(e)
            return StatusResponse(message="NG")

    def update_writing(self, id: str, writing: UpdateWritingBodyDto) -> StatusResponse:
        try:
            self.__writing_repository.update(
                id, WritingUpdate(title=writing.title, description=writing.description)
            )
            return StatusResponse(message="OK")
        except Exception as e:
            logger.error(e)
            return StatusResponse(message="NG")

    def delete_writing(self, id: str) -> StatusResponse:
        try:
            self.__writing_repository.delete(id)
            return StatusResponse(message="OK")
        except Exception as e:
            logger.error(e)
            return StatusResponse(message="NG")

    def __convert_list_response(self, writings: List[WritingGet]) -> WritingsResponse:
        return WritingsResponse(
            message=[
                WritingDto(
                    id=writing.id,
                    title=writing.title,
                    description=writing.description,
                    created_at=writing.created_at,
                    updated_at=writing.updated_at,
                )
                for writing in writings
            ]
        )
