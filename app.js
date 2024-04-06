var createError = require("http-errors");
var express = require("express");
const { createServer } = require("http");
var cookieParser = require("cookie-parser");
var connect_mongodb = require("./mongodb");
var connect_socket = require("./socket_io");
var messageRouter = require("./routes/messages");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("views"));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use("/messages", messageRouter);



app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

const port = 3001;
const server = createServer(app);

server.listen(port, function () {
  console.log(`Connected server port: ${port}`);
  connect_mongodb();
  connect_socket(server);
});

module.exports = app;
