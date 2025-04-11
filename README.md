# RESTful API Intro Room Service

## Manual Installation - Local Setup

follow these steps:

Clone the repo:

```bash
git clone  http://git.intelliswift.com/Pregis/pregis-backend.git
cd pregis-backend
npx rimraf ./.git
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

Run Command Postgres -> Docker Container:

```bash
docker run --name postgres-container -e POSTGRES_USER=postgres   -e POSTGRES_PASSWORD=postgres   -e POSTGRES_DB=postgres   -p 5432:5432 -v pgdata:/var/lib/postgresql/data -d postgres
```

Run Application:

```bash
npm run start:dev
```

## How to Run Apllication on Docker ?

Run Command:

```bash
docker compose up build -d
```

## Application Access URLs

```bash
1. http://localhost:3000 (Backend Service)
2. http://localhost:8080/ (Jenkins)
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Logging](#logging)
- [Custom Mongoose Plugins](#custom-mongoose-plugins)

## Commands

Running locally:

```bash
npm run start:dev
```

Running in production:

```bash
npm start
```

Testing:

```bash
# run all tests
npm test

```

Docker:

```bash
# run docker container in development mode
docker compose up build -d
```

Linting:

```bash
# run ESLint
npm run lint

# fix ESLint errors
npm run lint:fix

# run prettier
npm run prettier

# fix prettier errors
npm run prettier:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Postgres DB
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=postgres


```

## Project Structure

```
src\
 |--comman\         # configuration related things
 |--config\         # DB module Config
 |--healthCare \    # healthCare resource
 |--room \          # room resource
 |--app.module.ts\
 |--app.controller.ts\
 |--test\
 |--app.js          # Express app
 |--mail.ts        # App entry point
```

### API Endpoints

- `BASE_URL` - http://localhost:3000

List of available routes:

**Auth routes**:\

- `POST  ${BASE_URL}/room/people`
- `POST  ${BASE_URL}/room/intro-time`
- `GET   ${BASE_URL}/room/total-intro-time`
- `GET   ${BASE_URL}/room/people-list`
- `GET   ${BASE_URL}/status`

## Logging

```javascript

logger.error('message'); 
logger.warn('message'); 
logger.info('message'); 
logger.http('message'); 
logger.verbose('message'); 
logger.debug('message'); 
```
