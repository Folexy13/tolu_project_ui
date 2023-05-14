import React, { useState } from "react";
import "./Styles.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import userOBJ from "../../Classes";
import { toast } from "react-toastify";

function DropdownButton({ options, data, label,nil }) {
  const [isOpen, setIsOpen] = useState(false);
  const [changedStat,setChangedStat]= useState(nil)
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
    } else if (option.value === "Pending" || option.value === "Approved" ||option.value === "Not Approved" || option.value === "Updateable") {
      let payload = {
        id: data._id,
        type:'status',
        field:option.value
      }
     await userOBJ.update_status(payload).then(res=>{
      if(res.status){
        setChangedStat(option.value)
        toast.success('Setting saved')
      }
     })
    } else {
      handleDelete(data._id);
    }
  };
  return (
    <div className="dropdown-container">
      <button className={changedStat==='Pending'?"dropdown-button pending": changedStat==='Approved'?"dropdown-button approved": changedStat==='Not Approved'?"dropdown-button not-approved": changedStat==='Updateable'?"dropdown-button updateable":"dropdown-button"} onClick={toggleDropdown} style={{background:changedStat && 'transaprent'}}>
        {changedStat?changedStat:label ? label : "Action"}
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
