import React from "react";
import "./DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({ showModal, onCancel, onConfirm }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-icon">
          <span className="icon-white">!</span>
        </div>
        <h2 className="modal-title">Are you sure</h2>
        <p className="modal-text">You won’t be able to revert this!</p>
        <div className="modal-buttons">
          <button className="btn cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
