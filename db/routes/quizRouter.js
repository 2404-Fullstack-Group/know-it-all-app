const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const express = require("express")
const quizRouter = express.Router()

// Get all quizzes
quizRouter.get("/", async (req, res, next) => {
  try {
    const response = await prisma.quiz.findMany({})
    res.send(response)
    await prisma.$disconnect
  } catch (error) {
    next(error)
  }
})

// Get quiz by id
quizRouter.get("/:quiz_id", async (req, res, next) => {
  try {
    const { quiz_id } = req.params
    const response = await prisma.quiz.findMany({
      where: {
        id: quiz_id
      }
    })
    res.send(response)
    await prisma.$disconnect
  } catch (error) {
    next(error)
  }
})



module.exports = quizRouter