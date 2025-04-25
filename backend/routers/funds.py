from datetime import datetime, timedelta

import yfinance as yf
from dto import ValidateUserDto
from fastapi import APIRouter, Depends, Query
from middleware.validate_user import validate_user
from repositories import PostgresRepo

router = APIRouter(tags=["funds"], prefix="/funds")


@router.get("/")
def get_funds(
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
    search: str = Query("", min_length=0),
    repo: PostgresRepo = Depends(),
    _: ValidateUserDto = Depends(validate_user),
):
    query = """
        SELECT id, ticker, name, region FROM funds
        WHERE ticker ILIKE %s OR name ILIKE %s OR id::text ILIKE %s
        LIMIT %s OFFSET %s
    """
    search_pattern = f"%{search}%"
    return repo.fetch_query(
        query,
        (
            search_pattern,
            search_pattern,
            search_pattern,
            limit,
            offset,
        ),
    )


@router.get("/history/{fund_ticker}")
def get_fund_history_by_ticker(
    fund_ticker: str,
    _: ValidateUserDto = Depends(validate_user),
):
    end_date = datetime.today()
    start_date = end_date - timedelta(days=365)

    ticker_data = yf.Ticker(fund_ticker)
    historical_data = ticker_data.history(
        start=start_date.strftime("%Y-%m-%d"),
        end=end_date.strftime("%Y-%m-%d"),
        interval="1mo",
    )

    if historical_data.empty:
        return {"error": "No data found for the given ticker"}

    return historical_data.reset_index().to_dict(orient="records")
