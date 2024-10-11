// react imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// component imports
import { ArticleForm } from "../templates/FormTemplates.jsx";
import { JSXSpan, JSXButton } from "../Elements.jsx";
import QuestionForm from "./QuestionForm.jsx";
import { Modal } from "../Elements";
import LoginForm from "./LoginForm";

// function imports
import { getDifficulty } from "../../utilities/getDifficulty.js";
import LoginPage from "../pages/LoginPage.jsx";

export default function QuizForm({
  userId,
  setUserId,
  token,
  setToken,
  updateQuiz,
  setUpdateQuiz
}) {
  // quizData is set to updateQuiz if it exists or creates a blank template object
  // This allows for QuizForm to be used to create and update a quiz
  const [quizData, setQuizData] = useState(
    updateQuiz
      ? updateQuiz
      : {
          category: "",
          questions: Array(5).fill({
            category: "",
            difficulty: "",
            question: "",
            correctAnswer: "",
            incorrectAnswers: Array(3).fill(""),
            tags: Array(3).fill(""),
            type: "Multiple Choice",
          }),
        }
  );
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState(null);
  const [isModal, setIsModal] = useState(false);

  const addQuestion = (event) => {
    event.preventDefault();
    if (quizData.questions.length < 15) {
      setQuizData((prevData) => ({
        ...prevData,
        questions: [
          ...prevData.questions,
          {
            category: prevData.category,
            difficulty: "",
            question: "",
            correctAnswer: "",
            incorrectAnswers: Array(3).fill(""),
            tags: Array(3).fill(""),
            type: "Multiple Choice",
          },
        ],
      }));
    }
  };

  const handleCategoryChange = (value) => {
    setQuizData((prevData) => ({
      ...prevData,
      category: value,
      questions: prevData.questions.map((question) => ({
        ...question,
        category: value,
      })),
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setQuizData((prevData) => {
      const updatedQuestions = [...quizData.questions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [field]: value,
      };
      return {
        ...prevData,
        questions: updatedQuestions,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(
      `https://know-it-all-app.onrender.com/api/users/${userId}/quizzes`,
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
    setUpdateQuiz(null)
    navigate("/profile/:user_id")
  };

  const handleModalOpen = () => {
    setIsModal(true);
  };
  const handleModalClose = () => {
    setIsModal(false);
  };

  useEffect(() => {
    const diffCalc = getDifficulty(quizData.questions);
    diffCalc
      ? setDifficulty(diffCalc)
      : setDifficulty("Please Select Question Difficulties");
  }, [quizData]);

  return (
    <>
      {isModal ? (
        <Modal
          content={
            <LoginPage
              setUserId={setUserId}
              setToken={setToken}
              isModal={isModal}
              setIsModal={setIsModal}
            />
          }
          closeModal={() => handleModalClose()}
        />
      ) : null}
      <form onSubmit={handleSubmit}>
        <header>
          <h2>
            <JSXSpan text="Create Your Own Quiz" />
          </h2>
          <select
            id="category"
            name="category"
            defaultValue={updateQuiz ? updateQuiz.category : "Select Category"}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option disabled>Select Category</option>
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
        </header>
        <JSXSpan text={`Difficulty: ${difficulty}`} />
        {quizData.questions.map((_, index) => (
          <ArticleForm
            key={index}
            form={
              <QuestionForm
                key={index}
                questionNum={index + 1}
                questionData={quizData.questions[index]}
                handleQuestionChange={handleQuestionChange}
                updateQuiz={updateQuiz}
              />
            }
          />
        ))}
        {quizData.questions.length < 15 ? (
          <JSXButton
            text={`Add Question (${quizData.questions.length}/15)`}
            onClick={addQuestion}
          />
        ) : null}
        {token ? <JSXButton text="Submit Quiz" /> : null}
      </form>
      {token ? null : (
        <JSXButton
          onClick={() => handleModalOpen()}
          text={"Sign in to Save Quiz"}
        />
      )}
    </>
  );
}
