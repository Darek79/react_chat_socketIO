const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const options = {
  maxHttpBufferSize: 1e8,
  cors: {
    origin: "http://localhost:3000",
    allowedHeaders: ["my-custom-header"],
    methods: ["GET", "POST"],
  },
};

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
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(compression());

app.get("/", (req, res, next) => {
  res.status(200).json({msg: "ok"});
});
// server-side
io.on("connection", (socket) => {
  //console.log(socket);
  socket.on("msg", (arg) => {
    io.emit("chat", {
      chatText: arg,
    });
  });
});

server.listen(5000, () => "server is up");
