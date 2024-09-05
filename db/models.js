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
  return { token };
};

const findUserByToken = async (token) => {
  try {
    const payload = await jwt.verify(token, JWT);
    const id = payload.id;
  } catch (ex) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
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
};

module.exports = {
  authenticate,
  findUserByToken,
};
