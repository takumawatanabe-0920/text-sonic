from fastapi.middleware.cors import CORSMiddleware
from app.main.writings.controllers import router as writing_router
from fastapi import FastAPI
from .middlware.log_middleware import LogMiddleware
from .infrastructure.db.database import get_engine
from .infrastructure import models

models.Base.metadata.create_all(bind=get_engine())

app = FastAPI()
app.add_middleware(LogMiddleware)
origins = [
    "http://localhost:3016",
    "https://text-sonic.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(writing_router)
