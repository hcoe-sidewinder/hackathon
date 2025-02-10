import React from "react";

const Modal = ({ onClose, title, children }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold text-bgColor mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;

