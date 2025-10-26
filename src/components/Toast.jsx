import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "error" ? "bg-red-500/15 border-[1px] border-red-500 text-red-500" : type === "info" ? "bg-blue-500" : "bg-green-500/15 border-[1px] border-green-500 text-green-500";

  return (
    <div
      className={`${bgColor}  px-4 py-2 rounded-md shadow-md fixed top-5 right-5 z-50`}
    >
      {message}
    </div>
  );
};

export default Toast;