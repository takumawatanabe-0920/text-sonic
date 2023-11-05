import os
from typing_extensions import Annotated

from fastapi import Depends
from server.app.main.infrastructure.schemas.writing_schema import (
    WritingCreate,
    WritingUpdate,
)

from server.app.main.writings.dto.request_dto import CreateWritingBodyDto
from server.app.main.writings.dto.request_dto import UpdateWritingBodyDto
from server.app.main.repository.writing_repository import (
    BaseWritingRepository,
    create_writing_repository,
)
from server.app.main.writings.dto.response_dto import (
    WritingsResponse,
    WritingResponse,
    WritingDto,
)


class WritingService:
    def __init__(
        self,
        writing_repository: BaseWritingRepository = Depends(create_writing_repository),
    ):
        self.__writing_repository = writing_repository

    def get_writings(self) -> WritingsResponse:
        writings = self.__writing_repository.get_all()
        return WritingsResponse(
            message=[
                WritingDto(
                    id=writing["id"],
                    title=writing.title,
                    description=writing["description"],
                    created_at=writing["created_at"],
                    updated_at=writing.updated_at,
                )
                for writing in writings
            ]
        )

    def get_writing_by_id(self, id: int) -> WritingResponse:
        writing = self.__writing_repository.get_by_id(id)
        if not writing:
            return WritingResponse(message=None)

        writings = writing.id

        return WritingResponse(
            message=WritingDto(
                id=writing.id,
                title=writing.title,
                description=writing.description,
                created_at=writing.created_at,
                updated_at=writing.updated_at,
            )
        )

    def create_writing(self, writing: CreateWritingBodyDto) -> WritingsResponse:
        return self.__writing_repository.save(
            WritingCreate(title=writing.title, description=writing.description)
        )

    def update_writing(
        self, id: int, writing: UpdateWritingBodyDto
    ) -> WritingsResponse:
        return self.__writing_repository.update(
            id, WritingUpdate(title=writing.title, description=writing.description)
        )

    def delete_writing(self, id: int) -> WritingsResponse:
        return self.__writing_repository.delete(id)
