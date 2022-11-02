// This is modular! Meaning you need to import this to use,
// Init should be done in server.js, there are several steps needed with express too initate.
// Once it is initated, you can use this module to grab the io.

//var io; // This will hold the io server.

const initIo = (app) => {
  const http = require("http");
  const ioServer = http.createServer(app);
  const {Server} = require("socket.io");
  const cors = require("cors"); // This is used for socket.io

  // This is cheating, I wish there was an way
  // to grab this server that is created.
  global.io = new Server(ioServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Just a connection based.
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  // Or we add all socket code here? Mmmm not too bad of an idea, because we can use this folder to store all socket stuff.
  console.log("  -IO> server is initalized, set to global.io");
  return ioServer;
};

module.exports = { initIo }; // was trying to make it so io can be exported and used else where, but for waht ever reason this fails.
