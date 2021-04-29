import React, { FC } from "react";
import ReactDOM from "react-dom";

import Button from "./Button";

interface AlertProps {
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  deleting: boolean;
}

const Alert: FC<AlertProps> = ({ onClose, onSubmit, title, deleting }) => {
  const targetE1 = document.getElementById("modal-root");
  const alert = (
    <div className="modal">
      <div className="modal-background" onClick={onClose}>
        <div className="modal-content has-background-white px-4 py-4 is-rounded">
          <h2 className="is-size-4 has-text-centered mb-4">{title}</h2>
          <div className="is-flex align-center">
            <Button text="Cancel" className="mr-2" onClick={onClose} />
            <Button
              text={deleting ? "Deleting..." : "Delete"}
              className="is-danger"
              onClick={onSubmit}
              disabled={deleting}
            />
          </div>
          <button className="modal-close is-large" onClick={onClose}></button>
        </div>
      </div>
    </div>
  );
  return targetE1 ? ReactDOM.createPortal(alert, targetE1) : alert;
};

export default Alert;
