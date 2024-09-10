const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const questionRouter = express.Router();

// Get all questions
questionRouter.get("/", async (req, res, next) => {
  try {
    const response = await prisma.question.findMany({});
    res.send(response);
    await prisma.$disconnect;
  } catch (error) {
    next(error);
  }
});

// Get question by id
questionRouter.get("/:question_id", async (req, res, next) => {
  try {
    const { question_id } = req.params;
    const response = await prisma.question.findMany({
      where: {
        id: question_id,
      },
    });
    res.send(response);
    await prisma.$disconnect;
  } catch (error) {
    next(error);
  }
});

module.exports = questionRouter;
