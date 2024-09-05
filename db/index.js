const { prisma } = require("./seed");

const express = require("express");
const app = express();
const port = env("PORT");

app.use(express.json());

const init = async () => {
  await prisma.connect();
  console.log("database connection initialized");
  app.listen(port, () => {
    console.log("server running");
  });
};

init();
