export const handleInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  questionText: string,
  answersState: { [key: string]: string | string[] }
) => {
  const { type, value, checked } = event.target;

  let updatedAnswers = { ...answersState };

  if (type === "radio") {
    updatedAnswers[questionText] = value;
  } else if (type === "checkbox") {
    const existingAnswers =
      (updatedAnswers[questionText] as string)?.split(", ") || [];
    if (checked) {
      updatedAnswers[questionText] = [...existingAnswers, value].join(", ");
    } else {
      updatedAnswers[questionText] = existingAnswers
        .filter((answer) => answer !== value)
        .join(", ");
    }
  }

  return updatedAnswers;
};

export const handleSubmit = async (answersState: {
  [key: string]: string | string[];
}) => {
  const response = await fetch("/api/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers: answersState }),
  });

  const data = await response.json();
  
  return data;
};

export const resetAnswers = () => {
  return {};
};
