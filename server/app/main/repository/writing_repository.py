from MySQLdb import DatabaseError
from sqlalchemy.orm import Session
from app.main.infrastructure.db.database import get_session
from app.main.infrastructure.schemas.writing_schema import (
    WritingCreate,
    WritingGet,
    WritingUpdate,
)
from app.main.infrastructure import models
from typing import Iterator, List, Optional


class BaseWritingRepository:
    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, exc_traceback):
        pass

    def save(self, writing: WritingCreate) -> None:
        raise NotImplementedError()

    def get_by_id(self, id: str) -> Optional[WritingGet]:
        raise NotImplementedError()

    def get_all(self) -> List[WritingGet]:
        raise NotImplementedError()

    def update(self, id: str, writing: WritingUpdate) -> None:
        raise NotImplementedError()

    def delete(self, id: str) -> None:
        raise NotImplementedError()


# SQLAlchemy Implementation of interface
class SQLWritingRepository(BaseWritingRepository):
    def __init__(self, session):
        self._session: Session = session

    def __exit__(self, exc_type, exc_value, exc_traceback) -> None:
        if any([exc_type, exc_value, exc_traceback]):
            self._session.rollback()

        try:
            self._session.commit()
        except DatabaseError:
            self._session.rollback()
            raise

    def get_all(self) -> List[WritingGet]:
        query = self._session.query(models.WritingInDB)
        return [
            WritingGet(
                id=str(writing.id),
                title=str(writing.title),
                description=str(writing.description),
                created_at=str(writing.created_at),
                updated_at=str(writing.updated_at),
            )
            for writing in query
        ]

    def get_by_id(self, id: str) -> Optional[WritingGet]:
        writing = (
            self._session.query(models.WritingInDB)
            .filter(models.WritingInDB.id == id)
            .first()
        )
        if writing:
            return WritingGet(
                id=str(writing.id),
                title=str(writing.title),
                description=str(writing.description),
                created_at=str(writing.created_at),
                updated_at=str(writing.updated_at),
            )

        return None

    def save(self, writing: WritingCreate) -> Optional[models.WritingInDB]:
        print(writing)
        writing = models.WritingInDB(
            title=writing.title, description=writing.description
        )
        print(writing)
        self._session.add(
            writing,
        )
        self._session.commit()
        self._session.refresh(writing)

        return None

    def update(self, id: str, writing: WritingUpdate) -> Optional[models.WritingInDB]:
        instance = (
            self._session.query(models.WritingInDB)
            .filter(models.WritingInDB.id == id)
            .first()
        )
        if instance:
            instance.title = writing.title  # type: ignore
            instance.description = writing.description  # type: ignore

            self._session.commit()
            self._session.refresh(writing)

        return None

    def delete(self, id: str) -> None:
        instance = (
            self._session.query(models.WritingInDB)
            .filter(models.WritingInDB.id == id)
            .first()
        )
        if instance:
            self._session.delete(instance)

        return None


def create_writing_repository() -> Iterator[BaseWritingRepository]:
    session = get_session()()
    writing_repository = SQLWritingRepository(session)

    try:
        yield writing_repository
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
