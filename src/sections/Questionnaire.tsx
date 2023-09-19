"use client";

import React, { useState } from "react";
import { questions } from "@/_mock";
import { Modal, Question, SubmitButton, ResetButton } from "@/components";
import { handleInputChange, handleSubmit, resetAnswers } from "@/utils/utils";

const Questionnaire: React.FC = () => {
  const title = "Onboarding Questionnaire";
  const [answersState, setAnswersState] = useState<{
    [key: string]: string | string[];
  }>({});

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionText: string
  ) => {
    const newAnswers = handleInputChange(event, questionText, answersState);
    setAnswersState(newAnswers);
  };

  const handleOptionClick = (
    optionValue: string,
    questionText: string,
    type: "checkbox" | "radio"
  ) => {
    if (type === "radio") {
      const mockEvent = {
        target: {
          value: optionValue,
          type: "radio",
        },
      } as React.ChangeEvent<HTMLInputElement>;

      handleInput(mockEvent, questionText);
    } else if (type === "checkbox") {
      const currentValues = (answersState[questionText] as string[]) || [];
      const isChecked = currentValues.includes(optionValue);

      const mockEvent = {
        target: {
          value: optionValue,
          type: "checkbox",
          checked: !isChecked,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      handleInput(mockEvent, questionText);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleFormSubmit = async () => {
    const data = await handleSubmit(answersState);
    setShowModal(true);
    console.log(data);
  };

  const handleResetAnswers = () => {
    const newAnswers = resetAnswers();
    setAnswersState(newAnswers);
  };

  const closeModal = () => {
    setShowModal(false);
    handleResetAnswers();
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <hr className="h-px my-5 bg-gray-300 border-0" />
      {questions.map((q) => (
        <Question
          key={q.id}
          questionData={q}
          answersState={answersState}
          handleInput={handleInput}
          handleOptionClick={handleOptionClick}
        />
      ))}
      <SubmitButton onClick={handleFormSubmit} />
      <ResetButton onClick={handleResetAnswers} />
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        answers={answersState}
      />
    </div>
  );
};

export default Questionnaire;
