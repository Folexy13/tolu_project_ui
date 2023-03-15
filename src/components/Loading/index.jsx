import React from "react";
import "./Styles.scss";
import { ImSpinner9 } from "react-icons/im";

const LoadingState = ({ color }) => {
  return (
    <div className="wrapper2">
      <ImSpinner9 color={color} />
    </div>
  );
};

LoadingState.defaultProps = {
  color: "brown",
};

export default LoadingState;
