// component imports
import Input from "../elements/Input";
import Title from "../elements/Title";

export default function QuestionCreatorForm({ questionNum }) {
  return (
    <div className="question-form">
      <Title text={`Question ${questionNum}`} />
      <Input
        numCol={2}
        name={`question${questionNum}`}
        placeholder={`question ${questionNum}`}
      />{" "}
      <Input isCorrect={true} placeholder="correct answer" />
      <Input isCorrect={false} placeholder="incorrect answer" />
      <Input isCorrect={false} placeholder="incorrect answer" />
      <Input isCorrect={false} placeholder="incorrect answer" />
    </div>
  );
}
