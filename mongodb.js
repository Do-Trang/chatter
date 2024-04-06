const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/chater")
    .then(() => {
      console.log("Connected to MongoDB: mongodb://27.0.0.1:27017");
      console.log("Create Database: chatter");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = connect;
