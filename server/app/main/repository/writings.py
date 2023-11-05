from sqlalchemy.orm import Session
from infrastructure import models
from server.app.main.infrastructure.schemas.writings import WritingCreate, WritingUpdate


class WritingRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_writings(self):
        return self.db.query(models.Writing).all()

    def get_writing_by_id(self, id: int):
        return self.__get_by_id(id)

    def create_writing(self, writing: WritingCreate):
        db_writing = models.Writing(
            title=writing.title, description=writing.description
        )
        self.db.add(db_writing)
        self.db.commit()
        self.db.refresh(db_writing)
        return db_writing

    def update_writing(self, id: int, writing: WritingUpdate):
        db_writing = self.__get_by_id(id)
        if not db_writing:
            return None
        db_writing["title"] = writing.title
        db_writing["description"] = writing.description
        self.db.commit()
        self.db.refresh(db_writing)
        return db_writing

    def delete_writing(self, id: int):
        db_writing = self.__get_by_id(id)
        self.db.delete(db_writing)
        self.db.commit()
        return db_writing

    def __get_by_id(self, id: int):
        return self.db.query(models.Writing).filter(models.Writing.id == id).first()
