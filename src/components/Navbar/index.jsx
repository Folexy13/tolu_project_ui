import React from "react";
import { BiHomeAlt, BiWorld } from "react-icons/bi";
import { RiToolsLine } from "react-icons/ri";
import { AiOutlineContacts } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { BiCartAlt } from "react-icons/bi";
// import {}
import "./Styles.scss";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="navbar_container">
      <div className="sect1">
        <div className="first_section">
          <div className="first_section_left">
            <h3>Welcome to Chriscrown Farm</h3>
          </div>
          <div className="first_section_right">
            {/* Icon */}
            chriscrownfarm@gmail.com
          </div>
        </div>
      </div>
      <div className="second_section">
        <ul className="second_section_left">
          <li>
            <BiHomeAlt /> Home
          </li>
          <li>
            <BiWorld /> About
          </li>
          <li>
            <RiToolsLine /> Services
          </li>
          <li>
            <AiOutlineContacts /> Contact
          </li>
        </ul>
        <ul className="second_section_right">
          <li>
            <Link to="/login">
              <FiLogIn /> Login
            </Link>
          </li>
          <li>
            <BiCartAlt /> Cart
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Index;
