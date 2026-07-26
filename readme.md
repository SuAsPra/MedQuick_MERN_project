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

## Deployment

* Vercel
* Render

## Containerization

* Docker

---

# Folder Structure

```text
MedQuick
│
├── frontend
│   ├── public
│   ├── src
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   └── package.json
│
├── docker-compose.yml
├── README.md
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
* Node.js
* npm
* Docker Desktop

## Clone Repository

```bash
git clone <repository-url>
cd MedQuick
```

## Build Docker Images

```bash
docker build -t medquick .
```

## Run with Docker

```bash
docker compose up
```

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