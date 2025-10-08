// src/components/Button.jsx
import React from "react";

const Button = ({ text, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
