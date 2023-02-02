import React from "react";
import "./Styles.scss";
import { DBHeader, DBNavbar } from "..";
const DashboardLayout = ({ isLoading, children }) => {
  return (
    <div className="dashboard">
      <DBNavbar />
      <DBHeader />
      <div className="container">{isLoading ? "Loading..." : children}</div>
    </div>
  );
};

export default DashboardLayout;
