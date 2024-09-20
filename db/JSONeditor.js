const fs = require("fs");

const data = JSON.parse(
  fs.readFileSync("../db/trivia-questions.json", "utf-8")
);

const updateData = data.map((obj) => {
  const { isNiche, ...rest } = obj;
  return rest;
});

fs.writeFileSync(
  "trivia-questions.json",
  JSON.stringify(updateData, null, 2),
  "utf-8"
);

console.log("removed field");
