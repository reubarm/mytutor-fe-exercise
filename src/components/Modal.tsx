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
      <div className="justify-center items-center flex fixed inset-0 z-50 p-6">
        <div className="flex flex-col justify-center items-center  w-[500px] mx-auto bg-white rounded-lg shadow-lg p-6">
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
      <div
        className="opacity-25 fixed inset-0 z-40 bg-black"
        onClick={closeModal}
      ></div>
    </>
  );
};
