from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.main.researches.controllers import router as researches_router
from fastapi import FastAPI
from .middlware.log_middleware import LogMiddleware

app = FastAPI()
app.add_middleware(LogMiddleware)
origins = [
    "http://localhost:3015",
    "https://vp-keyword-tool.vercel.app",
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
    uvicorn.run(app, host="0.0.0.0", port=8081, log_config=None)
