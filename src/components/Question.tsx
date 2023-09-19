import { Answer, Checkbox } from "@/components";

interface QuestionProps {
  questionData: Question;
  answersState: { [key: string]: string | string[] };
  handleInput: (
    event: React.ChangeEvent<HTMLInputElement>,
    questionText: string
  ) => void;
  handleOptionClick: (optionValue: string, questionText: string) => void;
}

export const Question: React.FC<QuestionProps> = ({
  questionData,
  answersState,
  handleInput,
  handleOptionClick,
}) => {
  return (
    <div className="mb-4">
      <label className="text-xl block mt-5 mb-3">{questionData.question}</label>
      <div className="flex flex-wrap -mx-2">
        {questionData.options.map((option) => {
          const isChecked = Boolean(
            questionData.type === "checkbox"
              ? (answersState[questionData.question] as string)
                  ?.split(", ")
                  .includes(option)
              : answersState[questionData.question] === option
          );

          return (
            <Answer
              key={`${questionData.id}-${option}`}
              checked={isChecked}
              role="button"
              onClick={() => handleOptionClick(option, questionData.question)}
            >
              <Checkbox checked={isChecked} type={questionData.type} />
              {option}
              <input
                id={`question-${questionData.id}-${option}`}
                aria-label={option}
                type={questionData.type}
                name={`question-${questionData.id}`}
                value={option}
                onChange={(e) => handleInput(e, questionData.question)}
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
