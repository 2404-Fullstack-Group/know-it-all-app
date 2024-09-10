const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const userQuestionRouter = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../models");

// Get all questions from user
userQuestionRouter.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const response = await prisma.question.findMany({
      where: {
        created_by: user_id,
      },
    });
    res.send(response);
    await prisma.$disconnect;
  } catch (error) {
    next(error);
  }
});

// Create question
userQuestionRouter.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const {
      category,
      tags,
      difficulty,
      isNiche,
      question,
      correctAnswer,
      incorrectAnswers,
      type,
    } = req.body;
    const response = await prisma.question.create({
      data: {
        category: category,
        tags: tags,
        difficulty: difficulty,
        isNiche: isNiche,
        question: question,
        correctAnswer: correctAnswer,
        incorrectAnswers: incorrectAnswers,
        type: type,
        user: {
          connect: {
            id: user_id,
          },
        },
      },
    });
    res.send(response);
    await prisma.$disconnect;
  } catch (error) {
    next(error);
  }
});

// Update question
userQuestionRouter.put("/:question_id", isLoggedIn, async (req, res, next) => {
  try {
    const { user_id, question_id } = req.params;
    const {
      category,
      tags,
      difficulty,
      isNiche,
      question,
      correctAnswer,
      incorrectAnswers,
      type,
    } = req.body;
    const response = await prisma.question.update({
      where: {
        id: question_id,
      },
      data: {
        category: category,
        tags: tags,
        difficulty: difficulty,
        isNiche: isNiche,
        question: question,
        correctAnswer: correctAnswer,
        incorrectAnswers: incorrectAnswers,
        type: type,
        user: {
          connect: {
            id: user_id,
          },
        },
      },
    });
    res.send(response);
    await prisma.$disconnect;
  } catch (error) {
    next(error);
  }
});

// Delete question
userQuestionRouter.delete(
  "/:question_id",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const { user_id, question_id } = req.params;
      await prisma.question.delete({
        where: {
          id: question_id,
          created_by: user_id,
        },
      });
      res.sendStatus(204);
      await prisma.$disconnect;
    } catch (error) {
      next(error);
    }
  }
);

module.exports = userQuestionRouter;
