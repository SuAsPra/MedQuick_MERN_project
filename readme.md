# MedQuick – Medicine & Emergency Essentials Delivery Platform

## Project Overview

MedQuick is a MERN stack web application designed to provide users with a fast, reliable, and user-friendly platform for purchasing medicines and emergency essentials online. The platform enables customers to browse products, manage prescriptions, place orders, and track deliveries, while administrators can efficiently manage inventory, categories, and customer orders.

---

# Problem it Solves

Traditional medicine purchasing can be time-consuming, especially during emergencies. Many users face difficulties in locating nearby pharmacies with the required medicines or ordering essential healthcare products quickly.

MedQuick addresses these issues by providing:

* A centralized online medicine store
* Easy product discovery
* Secure order placement
* Efficient inventory management
* Prescription-based medicine support

---

# Target Users (Personas)

### Customer

* Purchase medicines and healthcare products
* Search and filter products
* Manage cart and orders
* Track deliveries

### Administrator

* Manage products
* Manage inventory
* Process customer orders
* Monitor platform activity

---

# Vision Statement

To provide a reliable, accessible, and efficient digital healthcare marketplace that simplifies medicine purchasing while ensuring a seamless experience for both customers and administrators.

---

# Key Features / Goals

* User Registration & Login
* Product Browsing
* Product Search & Filtering
* Shopping Cart
* Wishlist
* Secure Checkout
* Order Management
* Prescription Verification (Placeholder)
* Customer Dashboard
* Admin Dashboard
* Inventory Management
* Product Reviews

---

# Success Metrics

The project will be considered successful if it achieves:

* Successful user authentication
* Accurate product management
* Smooth shopping cart functionality
* Successful order placement
* Responsive user interface
* Efficient inventory management
* Secure API communication
* Stable deployment

---

# Assumptions & Constraints

## Assumptions

* Users have internet access.
* MongoDB Atlas remains available.
* Customers provide accurate account information.
* Prescription verification is implemented as a placeholder for this phase.

## Constraints

* Developed using the MERN stack.
* Docker used for local development.
* Limited to educational purposes.
* Uses free-tier deployment services (Vercel, Render, MongoDB Atlas).

---

# Technology Stack

## Frontend

* React.js
* Material UI
* Redux Toolkit
* Axios

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose

## Containerization

* Docker - Containerizes frontend, backend, and MongoDB
* Docker Compose - Orchestrates multi-container setup
* Hot reload enabled for development
* Volume-based persistence for database

---

# 🐳 Docker Support

**MedQuick is fully containerized for easy local development!**

The project includes complete Docker setup with:
- ✅ Separate Dockerfiles for frontend and backend
- ✅ docker-compose.yml orchestrating all services (MongoDB, Backend, Frontend)
- ✅ Hot reload enabled for both frontend and backend
- ✅ Database persistence across restarts
- ✅ Easy environment configuration via .env

**Get started in 3 commands:**
```bash
cp .env.example .env
docker-compose up --build
# Open http://localhost:3000
```

For full Docker documentation, see [**DOCKER_SETUP.md**](./DOCKER_SETUP.md)

---

# Folder Structure

```text
MedQuick
│
├── frontend                    # React frontend application
│   ├── public
│   ├── src
│   ├── Dockerfile              # Frontend container image
│   ├── .dockerignore           # Docker build exclusions
│   └── package.json
│
├── backend                     # Node.js backend API
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── database
│   ├── seed
│   ├── utils
│   ├── Dockerfile              # Backend container image
│   ├── .dockerignore           # Docker build exclusions
│   ├── index.js
│   └── package.json
│
├── docker-compose.yml          # Docker Compose configuration
├── .env.example                # Environment variables template
├── README.md                   # Project overview
├── DOCKER_SETUP.md             # Detailed Docker guide
├── requirements.md             # Software requirements
├── MOSCOW.md                   # Project prioritization
├── to_implement.md             # Implementation tasks
├── user_stories.md             # User stories
├── vision_document.md          # Project vision
├── MedQuick_Project.mdj        # Project model
└── .gitignore
```

---

# Branching Strategy

This project follows the **GitHub Flow** branching strategy.

## Branches

* **main** – Stable production-ready branch.
* **feature-suriyan** – Development branch for Suriyan.
* **feature-arun** – Development branch for Arun.
* **feature-sairam** – Development branch for Sairam.

### Workflow

1. Create a feature branch from **main**.
2. Develop features independently.
3. Commit and push changes.
4. Create a Pull Request.
5. Review and merge into **main**.

---

# Quick Start – Local Development

## Prerequisites

* Git
* Docker Desktop (includes Docker & Docker Compose)
* (Optional) Node.js 18+ and npm (for local development without Docker)

## Clone Repository

```bash
git clone <repository-url>
cd medquick_mern
```

## Setup with Docker (Recommended)

Docker provides the easiest setup with no local Node.js installation needed.

### Step 1: Create Environment File

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env if needed (defaults work for local development)
```

### Step 2: Build and Run

```bash
# Build images and start all services
docker-compose up --build

# Services will start:
# - Frontend at http://localhost:3000
# - Backend API at http://localhost:8080
# - MongoDB at localhost:27017
```

### Step 3: Stop Services

```bash
# Stop all services (keep data)
docker-compose down

# Stop and remove everything including data
docker-compose down -v
```

## Important Docker Notes

✅ **Hot Reload Enabled**
- Backend auto-restarts when code changes (nodemon)
- Frontend auto-refreshes on code changes (React dev server)

✅ **Database Persistence**
- MongoDB data persists in volume even after `docker-compose down`

✅ **Inter-service Communication**
- Backend connects to MongoDB automatically
- Frontend connects to backend automatically

## Detailed Docker Setup Guide

For comprehensive Docker documentation including:
- How each file works
- Detailed service configuration
- 20+ commands reference
- Troubleshooting guide
- Production conversion steps

See [**DOCKER_SETUP.md**](./DOCKER_SETUP.md)

## Alternative: Local Development (Without Docker)

If you prefer local development without Docker:

### Prerequisites
* Node.js 18+
* npm or yarn
* MongoDB (local or Atlas URI)

### Steps

```bash
# Backend setup
cd backend
npm install
# Create .env file with:
# MONGO_URI=mongodb://localhost:27017/medquick
# ORIGIN=http://localhost:3000
# JWT_SECRET=your-secret-key
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASSWORD=your-password
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
# Create .env file with:
# REACT_APP_API_BASE_URL=http://localhost:8080
npm start
```

## Database Seeding

To populate the database with sample healthcare products and categories:

```bash
# With Docker
docker-compose exec backend npm run seed

# Without Docker (from backend directory)
npm run seed
```

## Useful Commands

| Command | Purpose |
|---------|---------|
| `docker-compose up -d` | Start services in background |
| `docker-compose ps` | List running containers |
| `docker-compose logs -f` | View real-time logs |
| `docker-compose logs -f backend` | View backend logs only |
| `docker-compose stop` | Stop all services |
| `docker-compose down` | Stop and remove containers |
| `docker-compose down -v` | Stop and remove everything including data |
| `docker-compose exec backend sh` | Open shell in backend container |

or

```bash
docker-compose up
```

The application will be available at:

```
http://localhost:3000
```

---

# Local Development Tools

* Visual Studio Code
* Git
* GitHub
* Docker Desktop
* Node.js
* npm
* MongoDB Atlas
* Postman
* Draw.io
* Figma

---

# Repository

GitHub Repository:

**<Add your GitHub repository link here>**

---

# Screenshots

## GitHub Repository

*(Insert screenshot of repository homepage.)*

---

## Branches

*(Insert screenshot showing main, feature-suriyan, feature-arun, and feature-sairam branches.)*

---

## Docker Build

*(Insert screenshot of successful `docker build`.)*

---

## Docker Compose

*(Insert screenshot of successful `docker compose up`.)*

---

## Application Running

*(Insert screenshot of the application running on `http://localhost:3000`.)*

---

## README Preview

*(Insert screenshot of the README displayed on GitHub.)*

---

## GitHub Project Board

The project uses a GitHub Project (Kanban Board) to manage development tasks.

Workflow:

Backlog → To Do → In Progress → Testing → Done

All user stories were created as GitHub Issues and managed through the GitHub Project board following an Agile Kanban workflow.


# Contributors

* Suriyan
* Sairam