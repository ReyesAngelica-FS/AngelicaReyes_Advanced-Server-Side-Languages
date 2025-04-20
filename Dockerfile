# Use Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy dependency files first
COPY package*.json ./

# Install project dependencies
RUN npm install

# Install CLI globally
RUN npm install -g @jworkman-fs/wdv-cli

# Install nodemon for auto-restart during development
RUN npm install --save-dev nodemon

# Copy the rest of the app
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Use nodemon for development
CMD ["npx", "nodemon", "server.js"]
