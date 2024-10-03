const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const quizRouter = express.Router();

// Get all quizzes
quizRouter.get("/", async (req, res, next) => {
  try {
    const quizList = await prisma.quiz.findMany({});
    const mainResponse = []

    for (let i = 0; i<quizList.length; i++) {
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
      mainResponse.push(finalResponse)
    }
    
    res.send(mainResponse);
    await prisma.$disconnect;
  } catch (error) {
    next(error);
  }
});

// Get quiz by id
quizRouter.get("/:quiz_id", async (req, res, next) => {
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
      category: response[0].question.category,
      questions: response.map(({ question }) => question),
    };
    res.send(finalResponse);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    next(error);
  }
});

module.exports = quizRouter;
