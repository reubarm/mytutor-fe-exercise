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

export const resetAnswers = (): Answer => {
  return {};
};
