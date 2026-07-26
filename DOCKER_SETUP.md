# MedQuick Docker Setup Guide

## Overview

This document provides a complete guide to building and running the MedQuick MERN application using Docker. The setup includes:

- **Backend**: Node.js + Express with MongoDB
- **Frontend**: React with hot reload support
- **Database**: MongoDB with data persistence
- **Development**: Hot reload enabled for both frontend and backend

---

## Files Created

### 1. `backend/Dockerfile`

**Purpose**: Containerizes the Node.js backend application.

**Key Features**:
- Uses Node.js 18 Alpine image (lightweight)
- Installs dependencies from `package.json`
- Exposes port 8080 for backend API
- Runs with `npm run dev` for hot reload using nodemon
- Copies application code into container

**How it works**:
```dockerfile
FROM node:18-alpine          # Lightweight base image
WORKDIR /app/backend         # Sets working directory
COPY package*.json ./        # Copies package files
RUN npm install              # Installs dependencies
COPY . .                     # Copies application code
EXPOSE 8080                  # Exposes port
CMD ["npm", "run", "dev"]   # Runs with nodemon
```

---

### 2. `frontend/Dockerfile`

**Purpose**: Containerizes the React frontend application.

**Key Features**:
- Uses Node.js 18 Alpine image
- Installs dependencies
- Exposes port 3000 for React dev server
- Runs with `npm start` for hot reload
- Supports stdin/tty for interactive development

**How it works**:
```dockerfile
FROM node:18-alpine       # Lightweight base image
WORKDIR /app/frontend     # Sets working directory
COPY package*.json ./     # Copies package files
RUN npm install           # Installs dependencies
COPY . .                  # Copies application code
EXPOSE 3000               # Exposes port
CMD ["npm", "start"]      # Runs React dev server
```

---

### 3. `docker-compose.yml`

**Purpose**: Orchestrates all services (MongoDB, Backend, Frontend) as a single unit.

**Services**:

#### MongoDB Service
- **Image**: mongo:7.0-alpine
- **Port**: 27017
- **Credentials**: Configurable via environment variables
- **Data Persistence**: Uses named volume `mongodb_data`
- **Health Check**: Ensures MongoDB is ready before backend connects
- **Database**: Creates `medquick` database

#### Backend Service
- **Build**: Uses `backend/Dockerfile`
- **Port**: 8080 (API)
- **Hot Reload**: Enabled via volume mount (except node_modules)
- **Dependencies**: Waits for MongoDB to be healthy
- **Environment Variables**: 
  - MONGO_URI (MongoDB connection string)
  - ORIGIN (Frontend URL for CORS)
  - JWT_SECRET (JWT authentication)
  - EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD (Email service)

#### Frontend Service
- **Build**: Uses `frontend/Dockerfile`
- **Port**: 3000 (React)
- **Hot Reload**: Enabled via volume mount (except node_modules)
- **Dependencies**: Waits for backend to start
- **Environment Variables**:
  - REACT_APP_API_BASE_URL (Backend API URL)
  - DANGEROUSLY_DISABLE_HOST_CHECK (Allows localhost connections)

**Networking**:
- All services communicate via `medquick-network` bridge network
- Services can reference each other by name (e.g., `mongodb:27017`)

---

### 4. `backend/.dockerignore`

**Purpose**: Specifies files to exclude from Docker build context.

**Benefits**:
- Reduces build time
- Prevents unnecessary files from being copied
- Excludes: node_modules, logs, .env files, IDE files, etc.

---

### 5. `frontend/.dockerignore`

**Purpose**: Specifies files to exclude from Docker build context for frontend.

**Benefits**:
- Similar to backend .dockerignore
- Prevents build artifacts and node_modules from bloating image

---

### 6. `.env.example`

**Purpose**: Template for environment variables.

**How to use**:
1. Copy this file to `.env`
2. Update values with your actual configuration
3. Docker Compose reads this file automatically

**Variables Explained**:

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_USERNAME` | MongoDB admin username | admin |
| `MONGO_PASSWORD` | MongoDB admin password | password |
| `BACKEND_ORIGIN` | Frontend URL (CORS) | http://localhost:3000 |
| `JWT_SECRET` | JWT signing secret | your-secret-key |
| `NODE_ENV` | Environment type | development |
| `EMAIL_HOST` | SMTP server host | smtp.gmail.com |
| `EMAIL_PORT` | SMTP server port | 587 |
| `EMAIL_USER` | SMTP username | your-email@gmail.com |
| `EMAIL_PASSWORD` | SMTP password | your-app-password |
| `REACT_APP_API_BASE_URL` | Backend API endpoint | http://localhost:8080 |

---

## Prerequisites

Before you begin, ensure you have:

1. **Docker** installed (v20.10 or later)
   - [Download Docker Desktop](https://www.docker.com/products/docker-desktop)
   
2. **Docker Compose** installed (usually comes with Docker Desktop)
   - Verify: `docker-compose --version`

3. **Node.js** (for development, not required for Docker but useful):
   - Optional for running locally without Docker
   - [Download Node.js](https://nodejs.org/)

4. **Git** (for version control):
   - [Download Git](https://git-scm.com/)

---

## Setup Instructions

### Step 1: Create Environment Configuration

```bash
# Navigate to project root
cd d:\Suriyan from 2024\College Sem 5\SE\Project\medquick_mern

# Copy the example environment file
cp .env.example .env

# Edit .env with your actual values (optional for local dev)
# For basic setup, defaults work fine for local development
```

**Important Environment Variables for Development**:
- `MONGO_PASSWORD`: Change from default for security
- `JWT_SECRET`: Use a strong secret
- `EMAIL_*`: Configure only if testing email features

### Step 2: Build Docker Images

```bash
# From project root directory
docker-compose build

# This will:
# - Build the backend image
# - Build the frontend image
# - Download MongoDB image
```

**Expected Output**:
```
[+] Building 45.2s (15/15) FINISHED
 => [backend internal] load build definition from Dockerfile
 => [frontend internal] load build definition from Dockerfile
 => ...
```

### Step 3: Start All Services

```bash
# From project root directory
docker-compose up

# Or run in background (detached mode)
docker-compose up -d
```

**What happens**:
1. MongoDB starts and initializes
2. Backend starts, connects to MongoDB
3. Frontend starts, connects to backend
4. Services are accessible on their respective ports

### Step 4: Verify Services Are Running

In another terminal:

```bash
# Check running containers
docker-compose ps

# Expected output:
# NAME                   STATUS              PORTS
# medquick-frontend      Up                  0.0.0.0:3000->3000/tcp
# medquick-backend       Up                  0.0.0.0:8080->8080/tcp
# medquick-mongodb       Up                  0.0.0.0:27017->27017/tcp
```

### Step 5: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **MongoDB**: mongodb://admin:password@localhost:27017

---

## Building and Running the Project

### Complete Build & Run (Recommended)

```bash
# Navigate to project root
cd d:\Suriyan from 2024\College Sem 5\SE\Project\medquick_mern

# Build and start all services
docker-compose up --build

# For background execution
docker-compose up -d --build
```

### Quick Start (After First Build)

```bash
# Simply start without rebuilding
docker-compose up

# Or in detached mode
docker-compose up -d
```

### Stop Services

```bash
# Stop all running services
docker-compose stop

# Stop and remove containers (keeps volumes)
docker-compose down

# Remove everything including volumes and data
docker-compose down -v
```

### View Logs

```bash
# View all service logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb

# View recent logs without following
docker-compose logs --tail=50 backend
```

---

## Hot Reload / Development Features

### Backend Hot Reload

✅ **Enabled** - Backend uses `nodemon` which automatically restarts when code changes.

**How it works**:
```yaml
volumes:
  - ./backend:/app/backend          # Mount source code
  - /app/backend/node_modules       # Don't override container's node_modules
```

**Make changes**:
1. Edit any file in `backend/` directory
2. nodemon detects the change
3. Backend automatically restarts
4. Check logs for changes: `docker-compose logs -f backend`

### Frontend Hot Reload

✅ **Enabled** - Frontend uses React dev server with hot module replacement.

**How it works**:
```yaml
volumes:
  - ./frontend:/app/frontend        # Mount source code
  - /app/frontend/node_modules      # Don't override container's node_modules
stdin_open: true                    # Required for React dev server
tty: true                           # Required for interactive mode
```

**Make changes**:
1. Edit any file in `src/` directory
2. React dev server detects the change
3. Browser automatically refreshes
4. Changes appear instantly

### MongoDB Data Persistence

✅ **Enabled** - MongoDB data is stored in a named volume.

**How it works**:
```yaml
volumes:
  mongodb_data:
    driver: local
```

**Features**:
- Data persists across `docker-compose down` commands
- Data is only lost when using `docker-compose down -v`
- Useful for development - don't lose test data

---

## Common Commands

| Command | Purpose |
|---------|---------|
| `docker-compose up` | Start all services |
| `docker-compose up -d` | Start in background |
| `docker-compose down` | Stop and remove containers |
| `docker-compose ps` | List running containers |
| `docker-compose logs -f` | View real-time logs |
| `docker-compose logs -f backend` | View backend logs only |
| `docker-compose exec backend npm run seed` | Run database seed script in backend |
| `docker-compose exec backend sh` | Open shell in backend container |
| `docker-compose rebuild` | Rebuild all images |
| `docker-compose restart backend` | Restart specific service |

---

## Database Seeding

If your project includes seed data:

```bash
# Run seed script in backend container
docker-compose exec backend npm run seed

# Or manually in container shell
docker-compose exec backend sh
npm run seed
exit
```

---

## Troubleshooting

### Problem: Ports Already in Use

**Error**: `Bind for 0.0.0.0:3000 failed: port is already allocated`

**Solution**:
```bash
# Find process using the port
netstat -ano | findstr :3000

# Or change the port in docker-compose.yml
# Change "3000:3000" to "3001:3000"
```

### Problem: MongoDB Connection Failed

**Error**: `MongooseError: connection timeout`

**Solution**:
1. Ensure MongoDB container is healthy: `docker-compose ps`
2. Check MongoDB logs: `docker-compose logs mongodb`
3. Try restarting: `docker-compose restart mongodb`

### Problem: Hot Reload Not Working

**Solution**:
1. Check volume mounts are correct in docker-compose.yml
2. Check file permissions in your OS
3. Restart the specific service:
   ```bash
   docker-compose restart backend
   docker-compose restart frontend
   ```

### Problem: Docker Build Fails

**Solution**:
```bash
# Force rebuild without cache
docker-compose build --no-cache

# Clean all and restart
docker-compose down -v
docker-compose up --build
```

### Problem: node_modules Issues

**Error**: `Module not found` or `Cannot find module`

**Solution**:
```bash
# Clear containers and rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

---

## Production vs Development

### Current Setup (Development)

```yaml
services:
  backend:
    command: npm run dev        # Uses nodemon
  frontend:
    command: npm start          # React dev server
```

### For Production Conversion

To convert this to production, you would:

1. **Change backend Dockerfile**:
   ```dockerfile
   RUN npm install --production
   CMD ["npm", "start"]
   ```

2. **Create frontend build Dockerfile** (multi-stage):
   ```dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=builder /app/build /usr/share/nginx/html
   EXPOSE 80
   ```

3. **Add environment-specific compose files**:
   - `docker-compose.yml` (development)
   - `docker-compose.prod.yml` (production)

---

## University Assignment Checklist

✅ **Requirements Met**:

- ✅ Docker setup for local development
- ✅ Separate Dockerfiles for frontend and backend
- ✅ docker-compose.yml orchestrating all services
- ✅ .dockerignore files included
- ✅ Hot reload enabled for development
- ✅ Correct ports configured (3000 for frontend, 8080 for backend, 27017 for MongoDB)
- ✅ Comprehensive documentation provided
- ✅ No application code modified
- ✅ Clear build and run instructions
- ✅ Environment variables documented
- ✅ MongoDB persistence enabled
- ✅ Inter-service networking configured

---

## Next Steps

1. Create `.env` file from `.env.example`
2. Run `docker-compose up --build`
3. Access http://localhost:3000
4. Start developing with hot reload enabled!

For any issues, check logs:
```bash
docker-compose logs -f
```

---

## Files Summary

| File | Type | Purpose |
|------|------|---------|
| `backend/Dockerfile` | Docker | Build backend image |
| `frontend/Dockerfile` | Docker | Build frontend image |
| `docker-compose.yml` | Config | Orchestrate services |
| `backend/.dockerignore` | Config | Exclude backend files |
| `frontend/.dockerignore` | Config | Exclude frontend files |
| `.env.example` | Template | Environment variables template |
| `DOCKER_SETUP.md` | Documentation | This guide |

