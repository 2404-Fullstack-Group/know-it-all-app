import https from "https";
import fs from "fs";

const QUESTIONS_PER_REQUEST = 50; // number of questions pulled per request to API, limit is 50
const FILE_PATH = "./trivia-questions.json";

let allQuestions = [];
let initialOffset = 0;
const INCREMENT = 1000; // number of questions pulled each iteration
const PAUSE_DURATION = 100; // duration (milliseconds) pause between iterations (prevent too-many-requests error)

// check for file and continue from last offset:
let existingQuestionIDs = new Set();

if (fs.existsSync(FILE_PATH)) {
  const fileData = fs.readFileSync(FILE_PATH, "utf-8");
  allQuestions = JSON.parse(fileData);
  initialOffset = allQuestions.length;

  // Populate the set with existing question IDs
  existingQuestionIDs = new Set(allQuestions.map((q) => q.id));
}

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchAllTriviaQuestions() {
  try {
    let offset = initialOffset;
    while (true) {
      console.log(`Fetching with offset: ${offset}`);
      const questions = await fetchAllTriviaBatch(
        QUESTIONS_PER_REQUEST,
        offset
      );
      if (questions.length === 0) {
        console.log("No more questions found. Stopping fetch");
        break;
      }

      // Filter out questions that are already in the file
      const newQuestions = questions.filter(
        (q) => !existingQuestionIDs.has(q.id)
      );

      if (newQuestions.length === 0) {
        console.log("All fetched questions are duplicates. Stopping fetch");
        break;
      }

      allQuestions = allQuestions.concat(newQuestions);

      // Add new question IDs to the set
      newQuestions.forEach((q) => existingQuestionIDs.add(q.id));

      offset += QUESTIONS_PER_REQUEST;
      fs.writeFileSync(
        FILE_PATH,
        JSON.stringify(allQuestions, null, 2),
        "utf-8"
      );
      console.log(`Fetched ${allQuestions.length} questions so far...`);
      await pause(PAUSE_DURATION);
    }
    console.log(`Finished fetching all ${allQuestions.length} questions`);
  } catch (error) {
    console.error("Error during fetch process:", error);
  }
}

function fetchAllTriviaBatch(limit, offset) {
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

fetchAllTriviaQuestions();
