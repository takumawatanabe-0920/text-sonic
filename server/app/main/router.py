from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.main.researches.controllers import router as researches_router
from fastapi import FastAPI
from .middlware.log_middleware import LogMiddleware
from .infrastructure.db.database import engine
from .infrastructure import models

models.Base.metadata.create_all(bind=engine)

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
app.include_router(researches_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8082, log_config=None)
