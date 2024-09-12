const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const userQuizRouter = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../models");

// GET all quizzes from user
userQuizRouter.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const response = await prisma.quiz.findMany({
      where: {
        created_by: user_id,
      },
    });
    res.send(response);
  } catch (error) {
    next(error);
  }
});

// GET single quiz with all questions from user
userQuizRouter.get("/:quiz_id", isLoggedIn, async (req, res, next) => {
  try {
    const { quiz_id } = req.params;
    const response = await prisma.q_junction.findMany({
      where: {
        quiz_id: quiz_id,
      },
      include: {
        question: true,
      },
    });
    const finalResponse = {
      quiz_id: response[0].quiz_id,
      questions: response.map(({ question }) => question),
    };
    res.send(finalResponse);
  } catch (error) {
    next(error);
  }
});

// Create quiz
userQuizRouter.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { category } = req.body;
    const response = await prisma.quiz.create({
      data: {
        user: {
          connect: {
            id: user_id,
          },
        },
        category: category
      },
    });
    res.send(response);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

// Add questions to quiz
userQuizRouter.post("/:quiz_id", isLoggedIn, async (req, res, next) => {
  try {
    const { quiz_id } = req.params;
    const { question_id } = req.body;

    const response = await prisma.q_junction.create({
      data: {
        quiz: {
          connect: {
            id: quiz_id,
          },
        },
        question: {
          connect: {
            id: question_id,
          },
        },
      },
    });
    res.send(response);
  } catch (error) {
    next(error);
  }
});

// Delete question from quiz
userQuizRouter.delete("/:quiz_id", isLoggedIn, async (req, res, next) => {
  try {
    const { user_id, quiz_id } = req.params;
    const { question_id } = req.body;

    const quizResponse = await prisma.quiz.findMany({
      where: {
        id: quiz_id,
      },
    });
    console.log(quizResponse);
    console.log(quizResponse.created_by);
    if (!(user_id === quizResponse[0].created_by)) {
      const error = Error("not authorized");
      error.status = 401;
      throw error;
    }

    await prisma.q_junction.delete({
      where: {
        quiz_id_question_id: {
          quiz_id: quiz_id,
          question_id: question_id,
        },
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = userQuizRouter;
