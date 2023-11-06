from functools import lru_cache
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL", "")


@lru_cache(maxsize=None)
def get_engine():
    return create_engine(DATABASE_URL, pool_pre_ping=True, echo=True)


def get_session():
    return sessionmaker(autocommit=False, autoflush=False, bind=get_engine())


Base = declarative_base()
