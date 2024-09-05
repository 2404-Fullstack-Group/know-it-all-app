const require = createRequire(import.meta.url)
const { PrismaClient } = require("@prisma/client") 
const prisma = new PrismaClient()
import { createRequire } from "module"

const data = require("./trivia-questions.json")

const categories = [
  'General Knowledge',
  'Geography',
  'Society & Culture',
  'Music',
  'Food & Drink',
  'Sport & Leisure',
  'Film & TV',
  'Science',
  'Arts & Literature',
  'History'
]

// const findUnique = async () => {
//   const questions = await prisma.question.findMany({})
//   const categories = []
//   for (let i = 0; i<questions.length; i++) {
//     categories.push(questions[i].category)
//   }

//   let outputArray = categories.filter(function (v, i, self) {

//     return i == self.indexOf(v)})

//   console.log(outputArray)
// }

const seed = async () => {
  await prisma.question.deleteMany({})
  await prisma.user.deleteMany({})

  const user = await prisma.user.create({
    data: {
      first_name: "Kai",
      last_name: "Fuller",
      username: "Admin",
      email: "admin@knowitall.com",
      password: "password"
    }
  })

  data.forEach(async (item) => {
    await prisma.question.create({
      data: {
        category: item.category,
        tags: item.tags,
        difficulty: item.difficulty,
        regions: item.regions,
        isNiche: item.isNiche,
        question: item.question,
        correctAnswer: item.correctAnswer,
        incorrectAnswers: item.incorrectAnswers,
        type: item.type,
        user: {
          connect: {
            id: user.id
          }
        }
      }
    })
  })

  categories.forEach(async (category) => {
    // const quiz = await prisma.quiz.create({
    //   data: {
    //     created_by: 
    //   }
    // })
    const categoryQuestions = await prisma.question.findMany({
      where:{
        category:category
      }
    
    })
  })
}

// seed()
findUnique()