import React, { useState } from "react";
import "./Styles.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

function DropdownButton({ options, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const nav = useNavigate();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleDelete = (id) => {
    console.log("Deleted-" + id);
  };
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (option.value === "request") {
      nav(ROUTES.REQUEST + "/" + data._id + "/view", { state: data });
    } else if (option.value === "view") {
    } else {
      handleDelete(data._id);
    }
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
