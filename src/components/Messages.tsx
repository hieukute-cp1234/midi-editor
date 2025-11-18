import { useState, useEffect, useCallback } from "react";

const AUTO_CLOSE_TIME = 3000;

export function ToastMessage({
  message,
  type = "success",
  duration = AUTO_CLOSE_TIME,
}: {
  message: string;
  type?: string;
  duration?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const showToast = useCallback(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (message) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      showToast();
    }
  }, [message, showToast]);

  const getStyles = () => {
    switch (type) {
      case "error":
        return {
          bgColor: "bg-red-500",
        };
      case "success":
      default:
        return {
          bgColor: "bg-green-500",
        };
    }
  };

  const { bgColor } = getStyles();

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 p-4 z-50">
      <div
        className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-xl flex items-center transition-opacity duration-300 ease-out`}
        role="alert"
      >
        <p className="font-medium">{message}</p>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
