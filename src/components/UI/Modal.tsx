import React, { FC, ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ onClose, title, children }) => {
  const targetE1 = document.getElementById("modal-root");
  const modal = (
    <div className="modal">
      <div className="modal-background" onClick={onClose}>
        <div className="modal-card">
          <header className="header-card-head">
            <p className="modal-card-title">{title}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={onClose}
            ></button>
          </header>
          <section className="modal-card-body">{children}</section>
          <footer className="modal-card-footer">
            <button className="button" onClick={onClose}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
  return targetE1 ? ReactDOM.createPortal(modal, targetE1) : modal;
};

export default Modal;
