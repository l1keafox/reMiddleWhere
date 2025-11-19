# ---------- Build client ----------
FROM node:21.6.2 as client

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# ---------- Build server ----------
FROM node:21.6.2 as server

WORKDIR /app
COPY server/package*.json ./
RUN npm install

# Copy server source
COPY server/ ./

# Copy client build into server's public folder
COPY --from=client /app/client/build ./client_build

EXPOSE 3001
CMD ["node", "server.js"]