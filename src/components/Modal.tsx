import React from "react";
import { answerFeedback } from "@/utils/helper";

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  answers: { [key: string]: string | string[] };
}

export const Modal: React.FC<ModalProps> = ({
  showModal,
  closeModal,
  answers,
}) => {
  if (!showModal) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full z-40 bg-black bg-opacity-25"
        onClick={closeModal}
      ></div>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="flex flex-col w-full max-w-[500px] mx-4 md:mx-0 bg-white rounded-lg shadow-lg p-6">
          <p className="my-10 text-xl leading-relaxed text-center">
            {answerFeedback(answers)}
          </p>
          <button
            className="px-10 py-2 bg-teal-400 hover:bg-teal-500 font-bold text-white text-lg rounded"
            type="button"
            onClick={closeModal}
          >
            Start Again
          </button>
        </div>
      </div>
    </>
  );
};
