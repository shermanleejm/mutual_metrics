import json
from base64 import b64decode

from dto import ValidateUserDto
from fastapi import Header, HTTPException


async def validate_user(token: str = Header(None)) -> ValidateUserDto:
    try:
        user_id, user_email = json.loads(b64decode(token))
        return ValidateUserDto(id=int(user_id), email=user_email)
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token") from e
