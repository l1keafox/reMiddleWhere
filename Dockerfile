# Use a base image for Node.js
FROM node:21.6.2

WORKDIR /app/client
# Copy client files and install dependencies
COPY client/package*.json ./
COPY client/ ./

# Build the client for production
RUN npm install
RUN npm run build


# Set working directory for the server
WORKDIR /app/server

# Copy server files and install dependencies
COPY server/package*.json ./
# Copy the rest of the server code
COPY server/ ./
RUN npm install

# Expose port for the Node server
EXPOSE 3001

# Start the server
CMD ["node", "server.js"]