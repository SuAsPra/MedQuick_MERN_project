FROM node:18-alpine
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
COPY . .
ENV HOST=0.0.0.0
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true
EXPOSE 3000
CMD ["npm", "start"]
