import React from "react";
import "./button.css";

const Button = ({ name, onClick, bgColor }) => {
  return (
    <div className="button-container">
      <button
        style={{ backgroundColor: bgColor }}
        className="button"
        onClick={onClick}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
