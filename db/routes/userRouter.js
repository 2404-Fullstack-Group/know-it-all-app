const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const userRouter = express.Router();
const { authenticate, isLoggedIn, findUserByToken } = require("../models");
const bcrypt = require("bcrypt");

// Get all Users
userRouter.get("/", async (req, res, next) => {
  try {
    const response = await prisma.user.findMany({});
    res.send(response);
    await prisma.$disconnect;
  } catch (error) {
    next(error);
  }
});

// Get logged in User
userRouter.get("/:user_id", isLoggedIn, async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const response = await prisma.user.findMany({
      where: {
        id: user_id,
      },
    });
    res.send(response[0]);
  } catch (error) {
    next(error);
  }
});

// Create a new User
userRouter.post("/", async (req, res, next) => {
  try {
    const { first_name, last_name, username, email, password } = req.body;
    const response = await prisma.user.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: await bcrypt.hash(password, 5),
      },
    });
    res.send(response);
    await prisma.$disconnect;
  } catch (error) {
    next(error);
  }
});

// Login and receive JWT
userRouter.post("/login", async (req, res, next) => {
  try {
    res.send(await authenticate(req.body));
  } catch (error) {
    next(error);
  }
});

// Update User
userRouter.put("/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { first_name, last_name, username, email, password } = req.body;
    const response = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        username: username,
      },
    });
    res.send(response);
    await prisma.$disconnect;
  } catch (error) {
    next(error);
  }
});

// Delete User
userRouter.delete("/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    await prisma.user.delete({
      where: {
        id: user_id,
      },
    });
    res.sendStatus(204);
    await prisma.$disconnect;
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
