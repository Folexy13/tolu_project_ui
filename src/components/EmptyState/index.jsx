import React from "react";
import "./Styles.scss";

const EmptyState = ({ data, color }) => {
  return (
    <div className="wrapper">
      <div className="" style={{ color: color }}>
        No {data} available
      </div>
    </div>
  );
};

export default EmptyState;
