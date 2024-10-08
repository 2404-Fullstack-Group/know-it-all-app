const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const data = require("./trivia-questions.json");

// 10 categories of questions pulled from the api
const categories = [
  "General Knowledge",
  "Geography",
  "Society & Culture",
  "Music",
  "Food & Drink",
  "Sport & Leisure",
  "Film & TV",
  "Science",
  "Arts & Literature",
  "History",
  "General Knowledge",
  "Geography",
  "Society & Culture",
  "Music",
  "Food & Drink",
  "Sport & Leisure",
  "Film & TV",
  "Science",
  "Arts & Literature",
  "History",
  "General Knowledge",
  "Geography",
  "Society & Culture",
  "Music",
  "Food & Drink",
  "Sport & Leisure",
  "Film & TV",
  "Science",
  "Arts & Literature",
  "History",
  "General Knowledge",
  "Geography",
  "Society & Culture",
  "Music",
  "Food & Drink",
  "Sport & Leisure",
  "Film & TV",
  "Science",
  "Arts & Literature",
  "History",
];

const seed = async () => {
  await prisma.q_junction.deleteMany({});
  await prisma.quiz.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.user.deleteMany({});

  // Creates the Admin user
  const user = await prisma.user.create({
    data: {
      first_name: "Ryan",
      last_name: "Fuller",
      username: "Admin",
      email: "admin@knowitall.com",
      password: await bcrypt.hash("password", 5),
    },
  });

  // inputs data from trivia-questions.json into the questions table
  data.forEach(async (item) => {
    await prisma.question.create({
      data: {
        category: item.category,
        tags: item.tags.length > 3 ? item.tags.slice(0, 3) : item.tags,
        difficulty: item.difficulty,
        question: item.question,
        correctAnswer: item.correctAnswer,
        incorrectAnswers: item.incorrectAnswers,
        type: item.type,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  });

  // Creates a quiz for each category that includes 10 random questions
  categories.forEach(async (category) => {
    // Creates the category quiz
    const quiz = await prisma.quiz.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        category: category,
      },
    });
    // find all questions from the questions table that is in a category
    const categoryQuestions = await prisma.question.findMany({
      where: {
        category: category,
      },
    });
    // List that will include non-repeating random numbers
    const indexList = [];
    // While loop to generate non-repeating random numbers and push to indexList
    while (indexList.length < 10) {
      const randomNum = Math.floor(Math.random() * categoryQuestions.length);
      if (!indexList.includes(randomNum)) {
        indexList.push(randomNum);
      }
    }
    // Creates a q_junction entry for the quiz and questions
    // q_junction allows for a many-to-many relationship between quizzes and questions
    indexList.forEach(async (i) => {
      await prisma.q_junction.create({
        data: {
          quiz: {
            connect: {
              id: quiz.id,
            },
          },
          question: {
            connect: {
              id: categoryQuestions[i].id,
            },
          },
        },
      });
    });
  });
};

seed();
module.exports = { prisma };
