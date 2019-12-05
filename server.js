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
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`);
  next();
}

module.exports = server;
