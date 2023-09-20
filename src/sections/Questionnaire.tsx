"use client";

import React, { useState } from "react";
import { questions } from "@/_mock";
import { Modal, Question, SubmitButton, ResetButton } from "@/components";
import { handleSubmit, resetAnswers } from "@/utils/utils";

const Questionnaire: React.FC = () => {
  const title = "Onboarding Questionnaire";
  const [answersState, setAnswersState] = useState<{ [key: string]: string | string[] }>({});
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionText: string
  ) => {
    const { type, value, checked } = event.target;

    let updatedAnswers = { ...answersState };

    if (type === "radio") {
      updatedAnswers[questionText] = value;
    } else if (type === "checkbox") {
      const existingAnswers = updatedAnswers[questionText] as string[] || [];
      if (checked) {
        updatedAnswers[questionText] = [...existingAnswers, value];
      } else {
        updatedAnswers[questionText] = existingAnswers.filter(answer => answer !== value);
      }
    }

    setAnswersState(updatedAnswers);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await handleSubmit(answersState);
    setShowModal(true);
    console.log(data);
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
        <SubmitButton onClick={() => handleFormSubmit} />
        <ResetButton onClick={() => setAnswersState(resetAnswers())} />
      </form>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        answers={answersState}
      />
    </div>
  );
};



export default Questionnaire;