# Mutual Metrics

## Setup
- Run `docker compose up --build -d` to start-up the 3 services needed.

## e2e tests
- Change directory to `frontend` using `cd frontend`
- Install the necessary packages using `pnpm i --frozen-lockfile`
- Run `pnpm exec playwright test`
- Run `pnpm exec playwright show-report`
