import { useState } from "react";
import { JSXButton, JSXInput, JSXSpan } from "../Elements";
import axios from "axios";
import Quiz from "../sections/Quiz";
import { Modal } from "../Elements";
import LoginForm from "./LoginForm";

export default function GenerateQuizForm({
  userId,
  setUserId,
  token,
  setToken,
}) {
  const [category, setCategory] = useState("Select Category");
  const [difficulty, setDifficulty] = useState("Select Difficulty");
  const [questionCount, setQuestionCount] = useState(5);
  const [quizData, setQuizData] = useState(null);
  const [isModal, setIsModal] = useState(false);

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleDifficultyChange = (e) => setDifficulty(e.target.value);
  const handleQuestionCountChange = (e) => setQuestionCount(e.target.value);

  const mapDifficulty = (difficulty) => {
    switch (difficulty) {
      case "very easy":
        return "easy";
      case "easy":
        return "easy";
      case "medium":
        return "medium";
      case "hard":
        return "hard";
      case "very hard":
        return "hard";
      default:
        return difficulty;
    }
  };

  const handleSubmit = async (e) => {
    e ? e.preventDefault() : null;
    if (category === "Select Category" || difficulty === "Select Difficulty") {
      alert("Please select a category and difficulty.");
      return;
    }

    const mappedDifficulty = mapDifficulty(difficulty);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/questions/random`,
        {
          params: {
            category: category,
            difficulty: mappedDifficulty,
            questionCount: questionCount,
          },
        }
      );

      const allQuestions = response.data;
      console.log("Received questions data:", allQuestions);

      if (!allQuestions || allQuestions.length === 0) {
        alert("No questions returned from API.");
        return;
      }

      const quizData = {
        category,
        questions: [...allQuestions],
      };

      console.log(userId, token);
      setQuizData(quizData);
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to generate quiz.");
    }
  };

  const handleModalOpen = () => {
    setIsModal(true);
  };
  const handleModalClose = () => {
    setIsModal(false);
  };
  const handleSaveQuiz = async () => {
    console.log(token);
    await axios.post(
      `http://localhost:3000/api/users/${userId}/quizzes`,
      {
        category: quizData.category,
        questions: quizData.questions,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <>
      {isModal ? (
        <Modal
          content={
            <LoginForm
              setUserId={setUserId}
              setToken={setToken}
              isModal={isModal}
              setIsModal={setIsModal}
            />
          }
          closeModal={handleModalClose}
        />
      ) : null}
      {quizData ? (
        <>
          {token ? (
            <JSXButton onClick={() => handleSaveQuiz()} text={"Save Quiz"} />
          ) : (
            <JSXButton
              onClick={() => handleModalOpen()}
              text={"Sign in to save quiz!"}
            />
          )}
          <JSXButton onClick={() => handleSubmit()} text={"regenerate quiz"} />
          <JSXButton
            onClick={() => setQuizData(null)}
            text={"change parameters"}
          />
          <Quiz quiz={quizData} />
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <h2>Generate Quiz</h2>
            <select
              id="category"
              name="category"
              value={category}
              onChange={handleCategoryChange}
            >
              <option disabled value="Select Category">
                Select Category
              </option>
              <option value="General Knowledge">General Knowledge</option>
              <option value="Geography">Geography</option>
              <option value="Society & Culture">Society & Culture</option>
              <option value="Music">Music</option>
              <option value="Food & Drink">Food & Drink</option>
              <option value="Sport & Leisure">Sport & Leisure</option>
              <option value="Film & TV">Film & TV</option>
              <option value="Science">Science</option>
              <option value="Arts & Literature">Arts & Literature</option>
              <option value="History">History</option>
            </select>

            <select
              id="difficulty"
              name="difficulty"
              value={difficulty}
              onChange={handleDifficultyChange}
            >
              <option disabled value="Select Difficulty">
                Select Difficulty
              </option>
              <option value="very easy">Very Easy</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="very hard">Very Hard</option>
            </select>
            <JSXSpan text={`${questionCount} Questions`} />
            <input
              type="range"
              min="5"
              max="15"
              value={questionCount}
              onChange={handleQuestionCountChange}
              className="slider"
              id="question-range"
            />
            <JSXButton text={"Generate"} />
          </form>
        </>
      )}
    </>
  );
}
