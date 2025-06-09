# IntakeApp

A full-stack application with a Flask backend, a modern frontend (React/Vue/etc.), and a PostgreSQL database, all orchestrated with Docker Compose.

---

## Project Structure

```
intakeApp/
├── backend/      # Flask API (Python)
├── frontend/     # Frontend app (React)
├── docker-compose.yml
└── README.md
```

---

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Quick Start

### 1. Clone the repository

```sh
git clone https://github.com/Fleur41/intakeApp.git
cd intakeApp
```

### 2. Environment Variables

Edit `backend/.env` as needed. Example:

```env
FLASK_ENV=development
DATABASE_URL=postgresql://postgres:postgres@db:5432/intake_bot
SECRET_KEY=your-secret-key-here
ADMIN_USER=postgres
ADMIN_PASS=postgres
```

### 3. Build and Run All Services

```sh
docker-compose up --build
```

- **Backend:** [http://localhost:5001](http://localhost:5001)
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Postgres:** Internal only, exposed to backend as `db:5432`

### 4. Stopping and Cleaning Up

To stop all services:

```sh
docker-compose down
```

To remove all containers and volumes (including database data):

```sh
docker-compose down -v
```

---

## Backend

- **Framework:** Flask (Python)
- **Entrypoint:** `app.py`
- **Runs on:** port 5000 inside container, mapped to 5001 on host
- **Environment:** Configured via `backend/.env`
- **Database:** Connects to PostgreSQL at `db:5432` (service name)

### Useful Commands

- View backend logs:
  ```sh
  docker-compose logs backend
  ```

---

## Frontend

- **Framework:** Modern JS (React, Vue, etc.)
- **Build:** Node.js build, served by Nginx
- **Runs on:** port 80 inside container, mapped to 3000 on host

### Useful Commands

- View frontend logs:
  ```sh
  docker-compose logs frontend
  ```

---

## Database

- **Image:** postgres:16
- **Data Persistence:** Uses Docker volume `pgdata`
- **Credentials:** Set in `docker-compose.yml` and used in backend `.env`

---

## Development Notes

- Code changes in `backend/` and `frontend/` are mounted into containers for live reload (if supported by your framework).
- For production, remove or adjust the volume mounts as needed.

---

## Troubleshooting

- **Port already in use:** Make sure nothing else is running on ports 3000 or 5001.
- **Database connection errors:** Ensure the backend uses `db` as the hostname, not `localhost`.
- **Frontend not loading:** Check that your frontend build outputs to `dist` (or adjust Dockerfile if using a different directory).

---

## License

MIT (or your chosen license)
