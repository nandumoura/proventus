export interface AlertProps {
  type: "SUCCESS" | "ERROR";
  message: string;
  showAlert: boolean;
  onCloseAlert: () => void;
}

const Alert = ({ type, message, showAlert, onCloseAlert }: AlertProps) => {
  const alertColor = type === "SUCCESS" ? "green" : "red";
  const textColor = `text-${alertColor}-500`;
  const bgColor = `bg-${alertColor}-50`;

  return (
    <div
      className={`${
        !showAlert && "hidden"
      } mt-12 my-4 px-8 rounded-md border-l-4 border-${alertColor}-500 ${bgColor} md:max-w-2xl  md:px-8`}
    >
      <div className="flex justify-between py-3">
        <div className="flex">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 rounded-full ${textColor}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {alertColor === "green" ? (
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </div>
          <div className="self-center ml-3">
            <span className={`capitalize font-semibold ${textColor}`}>
              {type}
            </span>
            <p className={`mt-1 ${textColor}`}>{message}</p>
          </div>
        </div>
        <button onClick={onCloseAlert} className={`self-start ${textColor}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Alert;
