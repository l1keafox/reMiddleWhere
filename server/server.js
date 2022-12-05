const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const path = require("path");
const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
require('dotenv').config({path:__dirname+'/.env'})
const db = require("./config/connection");
const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Socket.io Stuff
const { initIo } = require("./socket/index"); // initIo to initalize the server, io later on just to grab the object.
const ioServer = initIo(app); // initalizing io into serverIo

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Access-Control-Allow-Origin: https://awesome-cool.netlify.app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    ioServer.listen(PORT, () => {
      // IO port being opened.

      console.log(`  -API> API server running on port ${PORT}!`);
      console.log(
        `  -GQL> Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
      console.log(`  -IO> Socket.io listening on http://localHost:${PORT}?`);
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);

