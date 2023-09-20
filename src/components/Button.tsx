export const SubmitButton: React.FC<{ onClick: any}> = ({
  onClick,
}) => (
  <button
    className="mr-4 px-10 py-2 bg-teal-400 hover:bg-teal-500 font-bold text-white text-lg rounded"
    onClick={onClick}
  >
    Submit
  </button>
);

export const ResetButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    className="px-4 py-2 bg-gray-500 text-white text-md rounded rounded my-3"
    onClick={onClick}
  >
    Reset
  </button>
);
