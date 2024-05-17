const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect("mongodb://mongo-0-a:27017,mongo-0-b:27017,mongo-0-c:27017/hotelbooking?replicaSet=rs0")
    .then(() => {
      console.log("Connected to MongoDB: mongodb://27.0.0.1:27017");
      // console.log("Create Database: chatter");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = connect;
