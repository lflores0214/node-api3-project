const express = require("express");
const helmet = require("helmet");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter")
const server = express();

server.use(logger);
server.use(helmet());
server.use(express.json()) // <<< this needs to go above routes below
server.use("/api/users", userRouter)
server.use("/api/posts", postRouter)

server.get("/", (req, res) => {
  const message = process.env.MSG || "hello world"
  res.send(`${message}`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`);
  next();
}

module.exports = server;
