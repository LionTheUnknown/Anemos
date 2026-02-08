# Anemos

Weather app with functionality for city search, current conditions, and a 5-day forecast.

## Tools
- IDE : VS Code or similar
- Docker Desktop: https://www.docker.com/products/docker-desktop/
- Git: https://git-scm.com/downloads
- Postman: https://www.postman.com/
- Bun: https://bun.sh/

**Features**
- Search cities and view current weather + 5-day forecast
- Persist frequently selected cities (top cities) in PostgreSQL

## Stack / Architecture

- Frontend: React + Vite, TypeScript, MUI, Tailwind
- Backend: Bun (Node.js-compatible) with Express
- Database: PostgreSQL (Docker for local dev)
- Weather data: Open-Meteo API

## Quickstart (local)

1. Start the database:

```bash
docker compose up -d
```

3. Run backend (in a separate terminal):

```bash
cd backend
bun install
bun run dev or bun src/index.js
```

4. Run frontend:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Tests

- Backend tests (Bun):

```bash
# from backend/
bun test
```

- Frontend tests (Vitest):

```bash
# from frontend/
npm run test
```

## Credits

- Animated React Weather Effects — https://github.com/rauschermate/react-weather-effects

## License

MIT
