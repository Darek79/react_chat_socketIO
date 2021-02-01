const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const path = require("path");
// const fs = require("fs");
const options = {
  maxHttpBufferSize: 1e8,
  cors: {
    origin: "http://localhost:3000",
    allowedHeaders: ["my-custom-header"],
    methods: ["GET", "POST"],
  },
};
//path to Images
// const imagesPath = path.dirname(__dirname, "socket_io", "public", "assets");
// console.log(fs.existsSync(imagesPath));

const io = require("socket.io")(server, options);
const compression = require("compression");
app.use("*", cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, authorization"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });
app.use(
  express.static(path.join(__dirname, "public"), {
    etag: true,
    maxAge: 120000,
  })
);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(compression());

app.get("/", (req, res, next) => {
  res.status(200).json({msg: "ok"});
});
let users = 0;
let arr = [];
// server-side
io.on("connection", (socket) => {
 
  socket.on("msg", (arg) => {
    io.emit("chat", arg);
  });
  socket.on("userEntry", (arg) => {
    if (!JSON.stringify(arr).includes(arg.name)) {
      arr.push(arg);
    }
    io.emit("userIn", arr);
  });
  socket.on("logout", (arg) => {
    
    let index = arr.findIndex(
      (el) => el.name === arg.name
    );
    arr.splice(index, 1);
    socket.broadcast.emit("userLeft", arr);
  });
});

server.listen(5000, () => "server is up");

server.on("SIGTERM", () => {
  server.close(() =>
    console.log("process terminated")
  );
});
