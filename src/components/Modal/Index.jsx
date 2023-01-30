import React from "react";
import "./Styles.scss";
import { MdCancelPresentation } from "react-icons/md";

const Modal = ({ width, height, onClick, close, children }) => {
  return (
    <div
      className="modal_container"
      style={{ display: !close ? "flex" : "none" }}
    >
      <div
        className="modal"
        style={{
          width,
          minHeight: height,
        }}
      >
        <MdCancelPresentation
          onClick={onClick}
          size={30}
          color="brown"
          style={{ float: "right", cursor: "pointer" }}
        />

        <div className="modal_body">{children}</div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  width: "600px",
  height: "300px",
};
export default Modal;
