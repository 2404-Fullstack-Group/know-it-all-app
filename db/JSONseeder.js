import https from "https";
import fs from "fs";

const QUESTIONS_PER_REQUEST = 50;
const FILE_PATH = "./trivia-questions.json";

let allQuestions = [];
let offset = 10000;

if (fs.existsSync(FILE_PATH)) {
  const fileData = fs.readFileSync(FILE_PATH, "utf-8");
  allQuestions = JSON.parse(fileData);
  offset = allQuestions.length;
}
const MAX_QUESTIONS = 1000 + allQuestions.length;

function fetchTriviaBatch(limit, offset) {
  return new Promise((resolve, reject) => {
    const url = `https://the-trivia-api.com/api/questions?limit=${limit}&offset=${offset}`;
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            const questions = JSON.parse(data);
            resolve(questions);
          } catch (error) {
            reject("Error parsing JSON data: " + error.message);
          }
        });
      })
      .on("error", (error) => {
        reject("Error fetching data: " + error.message);
      });
  });
}

async function fetchAllTriviaQuestions() {
  try {
    while (allQuestions.length < MAX_QUESTIONS) {
      const questions = await fetchTriviaBatch(QUESTIONS_PER_REQUEST, offset);
      allQuestions = allQuestions.concat(questions);
      offset += QUESTIONS_PER_REQUEST;
      console.log(`Fetched ${allQuestions.length} questions so far...`);

      fs.writeFileSync(
        FILE_PATH,
        JSON.stringify(allQuestions, null, 2),
        "utf-8"
      );
    }

    console.log(`Finished fetching all ${allQuestions.length} questions!`);
  } catch (error) {
    console.error("Error during fetching process:", error);
  }
}
fetchAllTriviaQuestions();
