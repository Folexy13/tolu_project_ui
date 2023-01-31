import React from "react";
import "./Styles.scss";

const EmptyState = ({ data }) => {
  return (
    <div className="wrapper">
      <div className="">No {data} available</div>
    </div>
  );
};

export default EmptyState;
