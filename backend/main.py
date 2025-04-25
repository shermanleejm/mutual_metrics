import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import funds_router, positions_router, users_router

load_dotenv()


def get_app():
    app_ = FastAPI()
    app_.include_router(users_router, tags=["users"])
    app_.include_router(funds_router, tags=["funds"])
    app_.include_router(positions_router, tags=["positions"])
    app_.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return app_


app = get_app()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", reload=os.getenv("ENV") == "local")
