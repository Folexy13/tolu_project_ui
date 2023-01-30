import React from "react";
import { BsSearch } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import "../../Pages/Private/Main/Styles.scss";
const DBHeader = () => {
  return (
    <div className="section">
      <div className="search_page">
        <div className="search">
          <BsSearch size={22} />
          <input type="text" placeholder="Search here..." />
        </div>
        <div className="icon">
          <RxAvatar size={40} style={{ cursor: "pointer" }} />
        </div>
      </div>
    </div>
  );
};

export default DBHeader;
