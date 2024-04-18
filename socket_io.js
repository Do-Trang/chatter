const { Server } = require("socket.io");
const Messages = require("./models/messages");

function sendAll(io, message) {
  io.emit("server_send_message", message);
}

function receive(message) {
  Messages.create(message);
}

function connect(server) {
  const io = new Server(server, {
    cors: {
      origin: `*`, // Replace with your client's origin
      methods: ["GET", "POST"],
    },
  });
  console.log("Connected socket");
  let userCount = 0;
  io.on("connection", (socket) => {
    userCount++;
    console.log(`User connected. Total users: ${userCount}`);
    socket.on("disconnect", () => {
      userCount--;
      console.log(`User disconnected. Total users: ${userCount}`);
    });
    socket.on("client_send_message", (msg) => {
      receive(msg);
      sendAll(io, msg);
    });
  });
}

module.exports = connect;
