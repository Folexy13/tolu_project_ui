import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { RiDashboardFill, RiGitRepositoryLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineInventory } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
const DBNavbar = ({ setActiveBar }) => {
  const [active, setActive] = useState("dashboard");
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    nav("/login");
  };
  return (
    <div className="nav">
      <ul>
        <li
          className={active === "dashboard" ? "active" : ""}
          onClick={() => {
            setActive("dashboard");
            setActiveBar("dashboard");
            nav("/dashboard");
          }}
        >
          <Link to={ROUTES.DASHBOARD}>
            <RiDashboardFill
              size={25}
              color={active === "dashboard" ? "#fff" : ""}
            />
            Dashboard
          </Link>
        </li>
        <li
          className={active === "record" ? "active" : ""}
          onClick={() => {
            setActive("record");
            setActiveBar("record");
            nav(ROUTES.RECORD);
          }}
        >
          <Link to={ROUTES.RECORD}>
            <RiGitRepositoryLine
              size={25}
              color={active === "record" ? "#fff" : ""}
            />{" "}
            Record
          </Link>
        </li>
        <li
          className={active === "inventory" ? "active" : ""}
          onClick={() => {
            setActive("inventory");
            setActiveBar("inventory");
          }}
        >
          <Link to={ROUTES.INVENTORY}>
            <MdOutlineInventory
              size={25}
              color={active === "inventory" ? "#fff" : ""}
            />{" "}
            Inventory
          </Link>
        </li>
        <li
          className={active === "settings" ? "active" : ""}
          onClick={() => {
            setActive("settings");
            setActiveBar("settings");
          }}
        >
          <Link to={ROUTES.SETTINGS}>
            <FiSettings size={25} color={active === "settings" ? "#fff" : ""} />{" "}
            Settings
          </Link>
        </li>
        <li onClick={handleLogout}>
          <Link to="#">
            <BiLogOut size={25} color={"red"} /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DBNavbar;
