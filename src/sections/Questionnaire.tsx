"use client";

import React, { useState, useEffect } from "react";
import { Modal, Question, SubmitButton, ResetButton } from "@/components";
import { handleSubmit, resetAnswers } from "@/utils/utils";

const Questionnaire: React.FC = () => {
  const title = "Onboarding Questionnaire";
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [answersState, setAnswersState] = useState<Answer>({});
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch questions:", error);
        setIsLoading(false);
      });
  }, []);

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

  const resetForm = () => {
    setAnswersState(prevState => resetAnswers());
    setShowModal(false);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = await handleSubmit(answersState);
      setShowModal(true);
      console.log(data);
      setError(null);
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
    setAnswersState(resetAnswers());
    setShowModal(false);
  };  

  if (isLoading) {
    return <div>...</div>;
  }

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
      </form>

      <ResetButton onClick={resetForm} />

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
