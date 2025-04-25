import os
from fastapi import Depends
import pandas as pd
import psycopg


def get_db_conn_str() -> str:
    return "dbname={dbname} user={user} password={password} host={host}".format(
        dbname=os.getenv("POSTGRES_DB", "postgres"),
        user=os.getenv("POSTGRES_USER", "postgres"),
        password=os.getenv("POSTGRES_PASSWORD", "postgres"),
        host=os.getenv("POSTGRES_HOST", "localhost"),
    )


class BaseRepo:
    def __init__(self, db_conn_str: str = Depends(get_db_conn_str)):
        self.db_conn_str = db_conn_str


class PostgresRepo(BaseRepo):
    def execute_query(self, query: str, params: tuple) -> None:
        with psycopg.connect(self.db_conn_str) as conn:
            with conn.cursor() as cur:
                cur.execute(query, params)
            conn.commit()

    def fetch_query(self, query: str, params: tuple | None) -> list:
        with psycopg.connect(self.db_conn_str) as conn:
            df = pd.read_sql_query(query, conn, params=params)
        return df.to_dict(orient="records")


class UserRepo(BaseRepo):
    def register_user(self, email: str, password_hash: str) -> int:
        with psycopg.connect(self.db_conn_str) as conn:
            user_id = conn.execute(
                """
                INSERT INTO users (email, password_hash, created_at)
                VALUES (%s, %s, NOW())
                RETURNING id, email;
                """,
                (email, password_hash),
            ).fetchone()
            return user_id

    def get_user_by_username(self, email: str) -> dict | None:
        with psycopg.connect(self.db_conn_str) as conn:
            user = conn.execute(
                """
                SELECT id, email, password_hash
                FROM users
                WHERE email = %s;
                """,
                (email,),
            ).fetchone()
        return user
