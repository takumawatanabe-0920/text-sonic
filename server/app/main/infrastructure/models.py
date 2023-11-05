from sqlalchemy import Column, Integer, String, DateTime
import datetime
from .db.database import Base


class Writing(Base):
    __tablename__ = "writings"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(50))
    description = Column(String)

    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)
