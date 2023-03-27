import React from "react";
import "./Styles.scss";
import { DBHeader, DBNavbar, Snackbar } from "..";
const DashboardLayout = ({ isLoading, children }) => {
  return (
    <div className="dashboard">
      <DBNavbar />
      <DBHeader />
      <Snackbar />

      <div className="container">{isLoading ? "Loading..." : children}</div>
    </div>
  );
};

export default DashboardLayout;
