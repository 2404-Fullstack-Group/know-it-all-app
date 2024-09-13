import Input from "../elements/Input";
import Title from "../elements/Title";

export default function QuestionCreatorForm({
  questionNum,
  questionData,
  handleQuestionChange,
}) {
  const handleArrayChange = (index, arrayName, value) => {
    const updatedArray = [...questionData[arrayName]];
    updatedArray[index] = value;
    handleQuestionChange(arrayName, updatedArray);
  };

  return (
    <div className="question-form">
      <Title text={`Question ${questionNum}`} />
      <div className="question-form-container">
        <div className="question-details">
          <Input
            numCol={2}
            name={`question${questionNum}`}
            placeholder={`Question ${questionNum}`}
            value={questionData.question}
            onChange={(e) => handleQuestionChange("question", e.target.value)}
          />
          <Input
            isCorrect={true}
            placeholder="Correct Answer"
            value={questionData.correctAnswer}
            onChange={(e) =>
              handleQuestionChange("correctAnswer", e.target.value)
            }
          />
          {questionData.incorrectAnswers.map((answer, idx) => (
            <Input
              key={idx}
              isCorrect={false}
              placeholder={`Incorrect Answer ${idx + 1}`}
              value={answer}
              onChange={(e) =>
                handleArrayChange(idx, "incorrectAnswers", e.target.value)
              }
            />
          ))}
        </div>
        <div className="question-aside">
          <select
            id="difficulty"
            name="difficulty"
            defaultValue={questionData.difficulty || "Select Difficulty"}
            onChange={(e) => handleQuestionChange("difficulty", e.target.value)}
          >
            <option disabled>Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          {questionData.tags.map((tag, idx) => (
            <Input
              key={idx}
              placeholder={`Tag ${idx + 1}`}
              value={tag}
              onChange={(e) => handleArrayChange(idx, "tags", e.target.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
