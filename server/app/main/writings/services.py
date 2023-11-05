import os

from server.app.main.writings.dto.writings import CreateWritingBodyDto
from server.app.main.writings.dto.writings import UpdateWritingBodyDto
from app.main.repository.writings import WritingRepository
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session


class WritingService:
    def __init__(self, repository: WritingRepository):
        self.__repository = repository

    def get_writings(self):
        return self.__repository.get_writings()

    def get_writing_by_id(self, id: int):
        return self.__repository.get_writing_by_id(id)

    def create_writing(self, writing: CreateWritingBodyDto):
        return self.__repository.create_writing(writing)

    def update_writing(self, id: int, writing: UpdateWritingBodyDto):
        return self.__repository.update_writing(id, writing)

    def delete_writing(self, id: int):
        return self.__repository.delete_writing(id)
