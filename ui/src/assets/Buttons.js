import React from "react";
import BUTTONSTYLE from "styles/assets/button.module.css";

export const Buttons = ({ children, onClick, buttonStyle, type }) => {
  const BTNSTYLE = ["btn-add", "btn-danger", "btn-update"];

  const checkButtonStyle = BTNSTYLE.includes(buttonStyle)
    ? buttonStyle
    : BTNSTYLE[0];

  return (
    <button
      className={`${BUTTONSTYLE.btn} ${BUTTONSTYLE[checkButtonStyle]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
