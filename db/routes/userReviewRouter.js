const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const userReviewRouter = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../models");

// Get all reviews from user
userReviewRouter.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const response = await prisma.review.findMany({
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

// Create review
userReviewRouter.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { quiz_id, rating } = req.body;
    const response = await prisma.review.create({
      data: {
        rating: rating,
        user: {
          connect: {
            id: user_id,
          },
        },
        quiz: {
          connect: {
            id: quiz_id,
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

// Update review
userReviewRouter.put("/:review_id", isLoggedIn, async (req, res, next) => {
  try {
    const { user_id, review_id } = req.params;
    const { quiz_id, rating } = req.body;
    const response = await prisma.review.update({
      where: {
        id: review_id,
      },
      data: {
        rating: rating,
        user: {
          connect: {
            id: user_id,
          },
        },
        quiz: {
          connect: {
            id: quiz_id,
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

// Delete review
userReviewRouter.delete("/:review_id", isLoggedIn, async (req, res, next) => {
  try {
    const { user_id, review_id } = req.params;
    await prisma.review.delete({
      where: {
        id: review_id,
        created_by: user_id,
      },
    });
    res.sendStatus(204);
    await prisma.$disconnect;
  } catch (error) {
    next(error);
  }
});

module.exports = userReviewRouter;
