# Backend Dockerfile for MedQuick
# This Dockerfile supports hot reload during development using nodemon

FROM node:18-alpine

# Set working directory
WORKDIR /app/backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the backend runs on
EXPOSE 8080

# Run the development server with nodemon for hot reload
CMD ["npm", "run", "dev"]
