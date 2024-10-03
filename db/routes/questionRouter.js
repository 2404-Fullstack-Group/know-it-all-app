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

// Get random questions based on category and difficulty
questionRouter.get("/random", async (req, res, next) => {
  try {
    const { category, difficulty, questionCount } = req.body;

    console.log(
      `Received category: ${category}, difficulty: ${difficulty}, questionCount: ${questionCount}`
    );

    const questions = await prisma.question.findMany({
      where: {
        category: category,
        difficulty: difficulty,
      },
    });

    const shuffled = questions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, parseInt(questionCount));

    console.log(`Selected questions: ${JSON.stringify(selectedQuestions)}`);

    res.send(selectedQuestions);
  } catch (error) {
    console.error("Error in /random route:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = questionRouter;
