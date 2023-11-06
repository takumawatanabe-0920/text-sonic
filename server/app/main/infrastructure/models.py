import uuid
from sqlalchemy import UUID, Column, Integer, String, DateTime
import datetime
from .db.database import Base


class WritingInDB(Base):
    __tablename__ = "writings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True)
    title = Column(String(50))
    description = Column(String(100))

    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)
