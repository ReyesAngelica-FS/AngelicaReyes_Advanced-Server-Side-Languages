# Use the official Node.js 20 image
FROM node:20

# Create and set working directory
WORKDIR /usr/src/app

# Copy package.json and lock file first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally (for hot-reload in dev)
RUN npm install -g nodemon

# Copy rest of your app
COPY . .

# Expose port 8080
EXPOSE 8080

# Default command
CMD ["nodemon", "server.js"]
