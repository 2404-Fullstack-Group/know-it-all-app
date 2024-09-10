const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(require("morgan")("dev"));

app.use("/api/users", require("./routes/userRouter"));
app.use("/api/questions", require("./routes/questionRouter"));
app.use(
  "/api/users/:user_id/questions",
  require("./routes/userQuestionRouter")
);
app.use("/api/quizzes", require("./routes/quizRouter"));
app.use("/api/users/:user_id/reviews", require("./routes/userReviewRouter"));

const init = async () => {
  app.listen(port, () => {
    console.log(`server running on ${port}`);
  });
};

init();
