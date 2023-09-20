"use client";

import React, { useState } from "react";
import { questions } from "@/_mock";
import { Modal, Question, SubmitButton, ResetButton } from "@/components";
import { handleSubmit, resetAnswers } from "@/utils/utils";

const Questionnaire: React.FC = () => {
  const title = "Onboarding Questionnaire";
  const [answersState, setAnswersState] = useState<{
    [key: string]: string | string[];
  }>({});
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionText: string
  ) => {
    const { type, value, checked } = event.target;

    let updatedAnswers = { ...answersState };

    if (type === "radio") {
      updatedAnswers[questionText] = value;
    } else if (type === "checkbox") {
      const existingAnswers = (updatedAnswers[questionText] as string[]) || [];
      if (checked) {
        updatedAnswers[questionText] = [...existingAnswers, value];
      } else {
        updatedAnswers[questionText] = existingAnswers.filter(
          (answer) => answer !== value
        );
      }
    }

    setAnswersState(updatedAnswers);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = await handleSubmit(answersState);
      setShowModal(true);
      console.log(data);
      setError(null); // clear any previous errors
    } catch (error: any) {
      if (error instanceof Error) {
        console.error("Error submitting form:", error.message);
        setError(error.message);
      } else {
        console.error("Unexpected error submitting form:", error);
        setError("An unexpected error occurred.");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setAnswersState(resetAnswers());
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <hr className="h-px my-5 bg-gray-300 border-0" />
      <form onSubmit={handleFormSubmit}>
        {questions.map((q) => (
          <Question
            key={q.id}
            questionData={q}
            answersState={answersState}
            handleInputChange={handleInputChange}
          />
        ))}
        <SubmitButton onClick={handleFormSubmit} />
        <ResetButton onClick={() => setAnswersState(resetAnswers())} />
      </form>

      {!error && (
        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 my-3">
          {error}
        </div>
      )}

      <Modal
        showModal={showModal}
        closeModal={closeModal}
        answers={answersState}
      />
    </div>
  );
};

export default Questionnaire;
