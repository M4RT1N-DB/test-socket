"use strict";

const express = require("express");
const app = express();

const serverHttp = require("http").Server(app);

const SocketIO = require("socket.io");

const myMessages = [];

//---------------------setting
app.set("port", process.env.PORT | 3000);


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method,"
  );
  res.header("content-type: application/json; charset=utf-8");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//---------------------start server
serverHttp.listen(app.get("port"), () => {
  console.log("servidor levantado en el puerto", app.get("port"));
});

const io = SocketIO(serverHttp);

io.on("connection", function (socket) {
  socket.on("send-message", function (data) {
    myMessages.push(data);
    socket.emit("text-event", myMessages);
    socket.broadcast.emit("text-event", myMessages);
  });
});
