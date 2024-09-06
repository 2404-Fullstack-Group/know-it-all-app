const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(require("morgan")("dev"))

app.use("/api/users", require("./routes/userRouter"))
app.use("/api/questions", require("./routes/questionRouter"))

const init = async () => {
  app.listen(port, () => {
    console.log(`server running on ${port}` );
  });
};

init();
