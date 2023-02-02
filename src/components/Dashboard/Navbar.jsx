import React from "react";
import { FiSettings } from "react-icons/fi";
import { RiDashboardFill, RiGitRepositoryLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineInventory } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
const DBNavbar = () => {
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    nav("/login");
  };
  const PATH = window.location.pathname;
  return (
    <div className="nav">
      <ul>
        <li className={PATH === ROUTES.DASHBOARD ? "active" : ""}>
          <Link to={ROUTES.DASHBOARD}>
            <RiDashboardFill
              size={25}
              color={PATH === ROUTES.DASHBOARD ? "#fff" : ""}
            />
            Dashboard
          </Link>
        </li>
        <li className={PATH === ROUTES.RECORD ? "active" : ""}>
          <Link to={ROUTES.RECORD}>
            <RiGitRepositoryLine
              size={25}
              color={PATH === ROUTES.RECORD ? "#fff" : ""}
            />{" "}
            Record
          </Link>
        </li>
        <li className={PATH === ROUTES.INVENTORY ? "active" : ""}>
          <Link to={ROUTES.INVENTORY}>
            <MdOutlineInventory
              size={25}
              color={PATH === ROUTES.INVENTORY ? "#fff" : ""}
            />{" "}
            Reorder Level
          </Link>
        </li>
        <li className={PATH === ROUTES.SETTINGS ? "active" : ""}>
          <Link to={ROUTES.SETTINGS}>
            <FiSettings
              size={25}
              color={PATH === ROUTES.SETTINGS ? "#fff" : ""}
            />{" "}
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
