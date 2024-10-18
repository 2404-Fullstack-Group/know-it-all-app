import { useEffect, useState } from "react";
import { JSXButton, JSXInput, JSXSpan } from "../Elements";

export default function QuestionForm({
  questionNum,
  questionData,
  handleQuestionChange,
  updateQuiz,
}) {
  const [isEditing, setIsEditing] = useState(updateQuiz ? false : true);

  const handleToggleEdit = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  const handleArrayChange = (index, array, value) => {
    const updatedArray = [...questionData[array]];
    updatedArray[index] = value;
    handleQuestionChange(questionNum - 1, array, updatedArray);
  };

  useEffect(() => {
    for (let i = questionData.tags.length; i < 3; i++) {
      questionData.tags.push("");
    }
  }, []);

  return (
    <div className="question-form">
      <header>
        <h3>
          <JSXSpan text={`Question ${questionNum}`} />
        </h3>
        <JSXButton
          text={isEditing ? "Apply Changes" : "Edit"}
          onClick={handleToggleEdit}
        />
      </header>

      {isEditing ? (
        <>
          <JSXInput
            className="question-form-question"
            placeholder="Question"
            value={questionData.question}
            onChange={(e) =>
              handleQuestionChange(questionNum - 1, "question", e.target.value)
            }
          />
          <div>
            <div className="question-form-container">
              <JSXInput
                className="question-form-correct-answer"
                placeholder="Correct Answer"
                value={questionData.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(
                    questionNum - 1,
                    "correctAnswer",
                    e.target.value
                  )
                }
                isRequired={true}
              />
              {questionData.incorrectAnswers.map((answer, index) => (
                <JSXInput
                  key={index}
                  className="question-form-wrong-answer"
                  placeholder={`Incorrect Answer ${index + 1}`}
                  value={answer}
                  onChange={(e) =>
                    handleArrayChange(index, "incorrectAnswers", e.target.value)
                  }
                  isRequired={true}
                />
              ))}
            </div>
            <div className="question-form-container">
              <select
                id="difficulty"
                name="difficulty"
                value={questionData.difficulty || "Select Difficulty"}
                onChange={(e) =>
                  handleQuestionChange(
                    questionNum - 1,
                    "difficulty",
                    e.target.value
                  )
                }
                required={true}
              >
                <option disabled>Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              {questionData.tags.map((tag, index) => (
                <JSXInput
                  key={index}
                  className={`question-form-tag-${index + 1}`}
                  placeholder={`Tag ${index + 1}`}
                  value={tag}
                  onChange={(e) =>
                    handleArrayChange(index, "tags", e.target.value)
                  }
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <JSXSpan text={`Question: ${questionData.question}`} />
          <div>
            <div className="question-form-container">
              <JSXSpan text={`Answer: ${questionData.correctAnswer}`} />
              <JSXSpan text={"Incorrect Answers:"} />
              <JSXSpan text={questionData.incorrectAnswers.join(", ")} />
            </div>
            <div className="question-form-container">
              <JSXSpan text={`Difficulty: ${questionData.difficulty}`} />
              <JSXSpan text={"Tags:"} />
              <JSXSpan text={questionData.tags.join(", ")} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
