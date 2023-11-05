from functools import lru_cache
import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.environ["DATABASE_URL"]


@lru_cache(maxsize=None)
def get_engine():
    return create_engine(DATABASE_URL, pool_pre_ping=True)


def get_session():
    return sessionmaker(autocommit=False, autoflush=False, bind=get_engine())


Base = declarative_base()
