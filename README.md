# Leaderboard API

This API is designed to manage a leaderboard for a game.

## Prerequisites

- Node.js (version 14 or higher)
- Docker and Docker Compose
- Postman (for testing the API)

## Setup

1. Clone the repository:
git clone <your-repo-url>
cd <project-directory-name>

text

2. Create a `.env` file in the project root and fill it with the following:
PORT=3000
MONGO_URI=mongodb://admin:password@mongodb:27017/leaderboard?authSource=admin
JWT_SECRET=your_secret_key

text

3. Install dependencies:
npm install

text

## Run

1. Start the application using Docker Compose:
docker-compose up --build

text

2. The API will be available at: http://localhost:3000

## Using the API

Use Postman to test the following endpoints:

1. Register a user:
- POST /api/auth/register
- Body: { "username": "user", "password": "pass" }

2. Login a user:
- POST /api/auth/login
- Body: { "username": "user", "password": "pass" }

3. Submit a score (requires token):
- POST /api/leaderboard/submit
- Headers: Authorization: Bearer <your_token>
- Body: { "username": "user", "score": 100 }

4. Get top 10 players:
- GET /api/leaderboard/top

5. Get a player's rank:
- GET /api/leaderboard/rank/:username

Remember to use the token obtained during login for authenticated requests.
