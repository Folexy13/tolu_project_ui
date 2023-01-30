import React from "react";
import "./Styles.scss";
import { DBHeader, DBNavbar } from "..";
import { useState } from "react";
const DashboardLayout = ({ children }) => {
  const [active, setActive] = useState("");
  const handleRoute = (val) => {
    // setActive(val);
  };
  // console.log("active bar:", active);
  return (
    <div className="dashboard">
      <DBNavbar setActiveBar={handleRoute} />
      <DBHeader />
      <div className="container">{children}</div>
    </div>
  );
};

export default DashboardLayout;
