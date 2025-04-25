from dataclasses import dataclass


@dataclass
class PositionDto:
    fund_id: int
    size: float
    buy_date: str
    sell_date: str | None


@dataclass
class RegisterUserDto:
    email: str
    password: str


@dataclass
class ValidateUserDto:
    id: int
    email: str
