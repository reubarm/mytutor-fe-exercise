import { Answer, Checkbox } from "@/components";

interface QuestionProps {
  questionData: Question;
  answersState: { [key: string]: string | string[] };
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    questionText: string
  ) => void;
}
export const Question: React.FC<QuestionProps> = ({
  questionData,
  answersState,
  handleInputChange,
}) => {
  return (
    <div className="mb-4">
      <label className="text-xl block mt-5 mb-3">{questionData.question}</label>
      <div className="flex flex-wrap -mx-2">
        {questionData.options.map((option) => {
          const currentAnswers =
            (answersState[questionData.question] as string[]) || [];
          const isChecked =
            questionData.type === "checkbox"
              ? currentAnswers.includes(option)
              : answersState[questionData.question] === option;

          const inputId = `question-${questionData.id}-${option}`;

          return (
            <Answer key={inputId} checked={isChecked}>
              <Checkbox checked={isChecked} type={questionData.type} />
              {option}
              <input
                id={inputId}
                aria-label={option}
                type={questionData.type}
                name={`question-${questionData.id}`}
                value={option}
                onChange={(e) => handleInputChange(e, questionData.question)}
                checked={isChecked}
                style={{ display: "none" }}
              />
            </Answer>
          );
        })}
      </div>
    </div>
  );
};
