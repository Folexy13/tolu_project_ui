import React, { useState } from "react";
import "./Styles.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import userOBJ from "../../Classes";
import { toast } from "react-toastify";

function DropdownButton({ options, data, label,nil }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const nav = useNavigate();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleDelete = (id) => {
    console.log("Deleted-" + id);
  };
  const handleOptionClick = async(option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (option.value === "request") {
      nav(ROUTES.REQUEST + "/" + data._id, { state: data });
    } else if (option.value === "Pending" || option.value === "Successful" ||option.value === "Rejected") {
      let payload = {
        id: data._id,
        type:'status',
        field:option.value
      }
     await userOBJ.update_status(payload).then(res=>{
      if(res.status){
        window.location.reload()
      }
     })
    } else {
      handleDelete(data._id);
    }
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown} style={{background:nil && 'transaprent'}}>
        {label ? label :nil?nil: "Action"}
      </button>
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option) => (
            <li key={option.value} onClick={() =>  handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownButton;
