# Frontend Dockerfile for MedQuick
# This Dockerfile supports hot reload during development with react-scripts

FROM node:18-alpine

# Set working directory
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the frontend runs on
EXPOSE 3000

# Run the development server with react-scripts for hot reload
CMD ["npm", "start"]
