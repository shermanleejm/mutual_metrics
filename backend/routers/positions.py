import pandas as pd
import yfinance as yf
from dto import PositionDto, ValidateUserDto
from fastapi import APIRouter, Depends
from middleware.validate_user import validate_user
from repositories import PostgresRepo

router = APIRouter()


@router.get("/portfolio")
async def get_portfolio(
    repo: PostgresRepo = Depends(),
    user: ValidateUserDto = Depends(validate_user),
):
    query = """
        select
            f.ticker,
            f.name,
            p.quantity,
            p.buy_date,
            p.sell_date
        from
            funds f
        inner join positions p on
            p.fund_id = f.id
        where
            p.user_id = %s
    """
    params = (user.id,)
    df = pd.DataFrame(repo.fetch_query(query, params))
    min_date = df["buy_date"].min()
    max_date = df["sell_date"].max()
    tickers = df["ticker"].unique().tolist()
    print(min_date, max_date, tickers)
    yfinance_data = yf.download(
        tickers=tickers,
        start=min_date,
        end=max_date,
        interval="1d",
        auto_adjust=True,
    )

    return (
        df[["buy_date", "ticker", "quantity"]]
        .groupby(["buy_date", "ticker"])
        .sum()
        .reset_index()
        .pivot(index="buy_date", columns="ticker", values="quantity")
        * yfinance_data["Close"]
    ).sum()


@router.get("/positions")
async def get_positions(
    repo: PostgresRepo = Depends(),
    user: ValidateUserDto = Depends(validate_user),
):
    query = """
        SELECT * FROM positions
        WHERE user_id = %s
    """
    print(user.id)
    params = (user.id,)
    return repo.fetch_query(query, params)


@router.put("/positions")
async def insert_position(
    position_data: PositionDto,
    repo: PostgresRepo = Depends(),
    user: ValidateUserDto = Depends(validate_user),
):
    query = """
        INSERT INTO positions (user_id, fund_id, quantity, buy_date, sell_date)
        VALUES (%s, %s, %s, %s, %s)
    """
    params = (
        user.id,
        position_data.fund_id,
        position_data.size,
        position_data.buy_date,
        position_data.sell_date,
    )
    repo.execute_query(query, params)
    return {"message": "Position inserted successfully"}


@router.put("/positions/{position_id}")
async def update_position(
    position_id: int,
    position_data: PositionDto,
    repo: PostgresRepo = Depends(),
):
    query = """
        UPDATE positions
        SET fund_id = %s, size = %s, buy_date = %s, sell_date = %s
        WHERE id = %s
    """
    params = (
        position_data.fund_id,
        position_data.size,
        position_data.buy_date,
        position_data.sell_date,
        position_id,
    )
    repo.execute_query(query, params)
    return {"message": "Position updated successfully"}


@router.delete("/positions/{position_id}")
async def delete_position(
    position_id: int,
    repo: PostgresRepo = Depends(),
):
    query = """
        DELETE FROM positions
        WHERE id = %s
    """
    params = (position_id,)
    repo.execute_query(query, params)
    return {"message": "Position deleted successfully"}
