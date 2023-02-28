import React, { useState } from "react";
import "./Styles.scss";

function DropdownButton({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        Action
      </button>
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option) => (
            <li key={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownButton;
