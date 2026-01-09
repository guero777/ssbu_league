# SSBU League 🎮

A full-stack web application for tracking Super Smash Bros. Ultimate matches and rankings among friends.

![Java](https://img.shields.io/badge/Java-17-orange?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5-green?logo=springboot)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Overview

SSBU League is a scoreboard application where users can register, log matches, and compete on a leaderboard. Built as a personal project to practice full-stack development with modern technologies.

### Features

- **User Authentication** – Secure registration and login with Spring Security
- **Match Tracking** – Record game results between players
- **Leaderboard** – Dynamic rankings based on match history
- **Character Selection** – Choose and display your main fighters
- **Responsive Design** – Mobile-friendly UI with Tailwind CSS

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite, Tailwind CSS, React Router |
| **Backend** | Java 17, Spring Boot 3.5, Spring Security, Spring Data JPA |
| **Database** | PostgreSQL 16 |
| **DevOps** | Docker, Docker Compose |

## Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- Docker & Docker Compose
- Maven 3.8+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/guero777/ssbu_league.git
   cd ssbu_league
   ```

2. **Set up environment variables**
   ```bash
   cp .env.template .env
   # Edit .env with your database credentials
   ```

3. **Start the database**
   ```bash
   docker compose -f compose-dev.yaml up -d
   ```

4. **Run the backend**
   ```bash
   ./mvnw spring-boot:run
   ```

5. **Run the frontend** (in a separate terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

6. **Open** http://localhost:5173 in your browser

### Docker Deployment

For production deployment:

```bash
# Build the application
./mvnw clean package -DskipTests

# Start all services
docker compose -f compose-prod.yaml up -d
```

## Project Structure

```
ssbu_league/
├── src/main/java/          # Spring Boot backend
│   └── com/example/ssbu_league/
│       ├── config/         # Security & app configuration
│       ├── controller/     # REST API endpoints
│       ├── dto/            # Data transfer objects
│       ├── models/         # JPA entities
│       ├── repository/     # Data access layer
│       └── service/        # Business logic
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── layouts/        # Page layouts
│   │   └── assets/         # Static assets
│   └── package.json
├── compose-*.yaml          # Docker Compose configs
└── pom.xml                 # Maven configuration
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register new user |
| POST | `/api/login` | User authentication |
| GET | `/api/userRankings` | Get leaderboard |
| GET | `/api/user/profile` | Get user profile |
| PUT | `/api/user/profile` | Update profile |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `POSTGRES_DEV_DB` | Database name |
| `POSTGRES_DEV_USER` | Database user |
| `POSTGRES_DEV_PASSWORD` | Database password |
| `ADMIN_PASSWORD` | Initial admin password |

See `.env.template` for all available options.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Super Smash Bros. Ultimate © Nintendo
- Built with [Spring Boot](https://spring.io/projects/spring-boot) and [React](https://react.dev)
