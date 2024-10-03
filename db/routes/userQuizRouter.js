const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const userQuizRouter = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../models");

// GET all quizzes from user
userQuizRouter.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const quizList = await prisma.quiz.findMany({
      where: {
        created_by: user_id,
      },
    });

    const mainResponse = [];

    for (let i = 0; i < quizList.length; i++) {
      const response = await prisma.q_junction.findMany({
        where: {
          quiz_id: quizList[i].id,
        },
        include: {
          question: true,
        },
      });
      const finalResponse = {
        quiz_id: response[0].quiz_id,
        category: response[0].question.category,
        questions: response.map(({ question }) => question),
      };
      mainResponse.push(finalResponse);
    }

    res.send(mainResponse);
    await prisma.$disconnect;
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
    const { category, questions } = req.body;
    const quiz = await prisma.quiz.create({
      data: {
        user: {
          connect: {
            id: user_id,
          },
        },
        category: category,
      },
    });
    questions.forEach(async (question) => {
      await prisma.q_junction.create({
        data: {
          quiz: {
            connect: {
              id: quiz.id,
            },
          },
          question: {
            create: {
              category: question.category,
              tags: question.tags,
              difficulty: question.difficulty,
              question: question.question,
              correctAnswer: question.correctAnswer,
              incorrectAnswers: question.incorrectAnswers,
              type: question.type,
              user: {
                connect: {
                  id: user_id,
                },
              },
            },
          },
        },
      });
    });

    res.send(quiz);
  } catch (error) {
    next(error);
  }
});

// Delete question from quiz or Delete entire Quiz
userQuizRouter.delete("/:quiz_id", isLoggedIn, async (req, res, next) => {
  try {
    const { user_id, quiz_id } = req.params;
    const { question_id } = req.body;

    const quizResponse = await prisma.quiz.findMany({
      where: {
        id: quiz_id,
      },
    });
    if (!(user_id === quizResponse[0].created_by)) {
      const error = Error("not authorized");
      error.status = 401;
      throw error;
    }
    // If question_id exist then delete the question from the quiz
    // If question_id doesn't exist then delete quiz
    if (question_id) {
      await prisma.q_junction.delete({
        where: {
          quiz_id_question_id: {
            quiz_id: quiz_id,
            question_id: question_id,
          },
        },
      });
    } else {
      const entries = await prisma.q_junction.findMany({
        where: {
          quiz_id: quiz_id,
        },
      });
      entries.forEach(async (entry) => {
        await prisma.q_junction.delete({
          where: {
            quiz_id_question_id: {
              quiz_id: entry.quiz_id,
              question_id: entry.question_id,
            },
          },
        });
      });
      await prisma.quiz.delete({
        where: {
          id: quiz_id,
        },
      });
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = userQuizRouter;
