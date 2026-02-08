# Anemos Backend

Node.js (Bun) backend for the Anemos weather app.

## Prerequisites

- [Bun](https://bun.sh/)
- PostgreSQL (or use Docker: `docker compose up -d` from project root)

## Setup

1. Copy `.env.example` to `.env` and adjust if needed.
2. Ensure PostgreSQL is running and create the database:
   ```bash
   psql -U postgres -c "CREATE DATABASE anemos;"
   psql -U anemos -d anemos -f schema.sql
   ```
3. Install dependencies:
   ```bash
   bun install
   ```
4. Start the server:
   ```bash
   bun run start
   ```
   Or for development with auto-reload:
   ```bash
   bun run dev
   ```

## API

- `GET /api/weather/selected?name=&country=&lat=&lon=` - Selected city weather + 5-day forecast
- `GET /api/weather/top-cities?excludeCity=&excludeCountry=` - Top 3 most viewed cities (excluding current)
- `POST /api/weather` - Body: `{ city, country, latitude, longitude }` - Log selection, return full weather response

## Environment

| Variable   | Default    |
|-----------|------------|
| PORT      | 8080       |
| DB_HOST   | localhost  |
| DB_PORT   | 5432       |
| DB_NAME   | anemos     |
| DB_USER   | anemos     |
| DB_PASSWORD | anemos   |
