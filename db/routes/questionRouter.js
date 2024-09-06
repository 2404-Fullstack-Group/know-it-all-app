const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const express = require("express")
const questionRouter = express.Router()


questionRouter.get("/", async (req, res, next) => {
  try {
    const response = await prisma.question.findMany({})
    res.send(response)
    await prisma.$disconnect
  } catch (error) {
    next(error)
  }
})

questionRouter.get("/:questionId", async (req, res, next) => {
  try {
    const { questionId } = req.params
    const response = await prisma.question.findMany({
      where: {
        id: questionId
      }
    })
    res.send(response)
    await prisma.$disconnect
  } catch (error) {
    next(error)
  }
})



module.exports = questionRouter