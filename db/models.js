const { prisma } = require("./seed");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT = process.env.SECRET;

const authenticate = async ({ username, password }) => {
  const response = await prisma.user.findMany({
    where: {
      username: username,
    },
  });
  if (
    !response.length ||
    (await bcrypt.compare(password, response[0].password)) === false
  ) {
    const error = Error("incorrect username or password");
    error.status = 401;
    throw error;
  }
  const token = await jwt.sign({ id: response[0].id }, JWT);
  await prisma.$disconnect;
  return { token: token, user: await findUserByToken(`Bearer ${token}`) };
};

const findUserByToken = async (token) => {
  try {
    console.log(`token: ${token}`);
    const tokenSplit = token.split(" ")[1];
    const payload = await jwt.verify(tokenSplit, JWT);
    const id = payload.id;
    const response = await prisma.user.findMany({
      where: {
        id: id,
      },
    });
    if (!response.length) {
      const error = Error("not authorized");
      error.status = 401;
      throw error;
    }
    return response;
  } catch (ex) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
};

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserByToken(req.headers.authorization);
    next();
  } catch (error) {
    next(error);
  }
};

const checkDuplicates = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const usernameResponse = await prisma.user.findMany({
      where: {
        username: username,
      },
    });

    const emailResponse = await prisma.user.findMany({
      where: {
        email: email,
      },
    });
    if (usernameResponse[0] && emailResponse[0]) {
      const error = Error("Username and Email are Unavailable");
      error.status = 409;
      throw error;
    }
    if (usernameResponse[0]) {
      const error = Error("Username Unavailable");
      error.status = 409;
      throw error;
    }

    if (emailResponse[0]) {
      const error = Error("Email Unavailable");
      error.status = 401;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate, findUserByToken, isLoggedIn, checkDuplicates };
