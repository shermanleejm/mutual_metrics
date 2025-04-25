from base64 import b64encode
import json
from typing import Annotated
import bcrypt
import psycopg
from email_validator import validate_email, EmailNotValidError
from dto import RegisterUserDto
from fastapi import APIRouter, Body, Depends, HTTPException
from repositories import UserRepo

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/register")
def register_user(
    dto: Annotated[
        RegisterUserDto,
        Body(example={"email": "test@email.com", "password": "password123"}),
    ],
    repo: UserRepo = Depends(),
):
    try:
        email_info = validate_email(dto.email)
        email = email_info.normalized
    except EmailNotValidError as e:
        raise HTTPException(status_code=400, detail="Invalid email address") from e
    password_hash = bcrypt.hashpw(dto.password.encode(), bcrypt.gensalt()).decode()
    try:
        return repo.register_user(email, password_hash)
    except psycopg.errors.UniqueViolation:
        raise HTTPException(status_code=400, detail="User already exists")


@router.post("/login")
def login_user(
    dto: Annotated[
        RegisterUserDto,
        Body(example={"email": "test@email.com", "password": "password123"}),
    ],
    repo: UserRepo = Depends(),
):
    user = repo.get_user_by_username(dto.email)
    user_id, user_email, password_hash = user
    if not user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    if not bcrypt.checkpw(dto.password.encode(), password_hash.encode()):
        raise HTTPException(status_code=400, detail="Invalid username or password")
    return b64encode(json.dumps([user_id, user_email]).encode()).decode()
