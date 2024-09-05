const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const express = require("express")
const userRouter = express.Router()
const { authenticate } = require("../models")
const bcrypt = require("bcrypt")



userRouter.post("/", async (req, res, next) => {
  try {
    const {first_name, last_name, username, email, password} = req.body
    const response = await prisma.user.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: await bcrypt.hash(password, 5)
      }
    })
    res.send(response)
    await prisma.$disconnect
  } catch (error) {
    next(error)
  }
})

userRouter.post("/login", async (req, res, next) => {
  try {
    res.send(await authenticate(req.body))
  } catch (error) {
    
  }
})


module.exports = userRouter