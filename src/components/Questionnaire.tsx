"use client";

import { useState } from "react";
import { questions } from "@/_mock";

const Questionnaire = () => {
  const [multiChoiceAnswers, setMultiChoiceAnswers] = useState<string[]>([]);
  const [singleChoiceAnswer, setSingleChoiceAnswer] = useState<string>("");

  const handleSubmit = async () => {
    const allAnswers = [...multiChoiceAnswers, singleChoiceAnswer];
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers: allAnswers }),
    });
    const data = await response.json();
    console.log(`Questionnaire Submit Response: ${data.message}`);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMultiChoiceAnswers((prev) =>
      event.target.checked
        ? [...prev, value]
        : prev.filter((answer) => answer !== value)
    );
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSingleChoiceAnswer(value);
  };

  const handleReset = () => {
    setMultiChoiceAnswers([]);
    setSingleChoiceAnswer("");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Onboarding Questionnaire</h1>
      {questions.map((q, index) => (
        <div key={q.id} className="mb-4">
          <label className="block mb-2">{q.question}</label>

          {q.options.map((option) => (
            <div key={option}>
              <input
                type={q.type}
                name={`question-${q.id}`}
                value={option}
                onChange={
                  q.type === "checkbox"
                    ? handleCheckboxChange
                    : handleRadioChange
                }
                checked={
                  q.type === "checkbox"
                    ? multiChoiceAnswers.includes(option)
                    : singleChoiceAnswer === option
                }
              />
              <label className="ml-2">{option}</label>
            </div>
          ))}
        </div>
      ))}

      <button className="mr-4" onClick={handleSubmit}>
        Submit
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Questionnaire;
