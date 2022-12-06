// This is modular! Meaning you need to import this to use,
// Init should be done in server.js, there are several steps needed with express too initate.
// Once it is initated, you can use this module to grab the io.

//var io; // This will hold the io server.
const { User, Group, Location } = require("../models");

let globalChat; // this is an virtual memory holding the chat, I don't want too store it.

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

  io.on("connection", (socket) => {
    console.log(`  -IO> Connection from User: ${socket.handshake.auth.user} Listening to:${socket.handshake.auth.group}`,);
    if(globalChat && globalChat[socket.handshake.auth.group]){
      io.emit(socket.handshake.auth.group,globalChat[socket.handshake.auth.group]);
    }
    socket.on(socket.handshake.auth.group, (msg) => {
      const groupName = socket.handshake.auth.group;
      console.log('  -IO Chat> Group:',socket.handshake.auth.group,"Msg Obj:",msg);
      // When this gets a chat,
      // let's initilize global if needed.
      if(!globalChat) globalChat= {};
      if(!globalChat[groupName])  globalChat[groupName] = [];
      // First it adds the new message to existing chat array.
      globalChat[groupName].push(msg);
      // console.log('  -IO>adding to globalChat',groupName,globalChat[groupName].length);
      // Then it will emit this too all users.
      io.emit(groupName,globalChat[groupName]);
    })

    socket.on("disconnect", () => {
      console.log(`  -IO> user disconnected`);
    });
  })  
 
  // Or we add all socket code here? Mmmm not too bad of an idea, because we can use this folder to store all socket stuff.
  console.log("  -IO> server is initalized, set to global.io");
  return ioServer;
};



module.exports = { initIo }; // was trying to make it so io can be exported and used else where, but for waht ever reason this fails.
