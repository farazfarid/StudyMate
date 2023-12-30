// src/components/EditSubjectModal.js
import React, { useState, useEffect } from "react";

const EditSubjectModal = ({
  isOpen,
  onRequestClose,
  subject,
  onEditSubject,
}) => {
  const [editedSubject, setEditedSubject] = useState({ ...subject });

  useEffect(() => {
    setEditedSubject({ ...subject });
  }, [subject]);

  const handleEditSubject = () => {
    onEditSubject(editedSubject);
    onRequestClose();
  };

  return (
    <div
      className={`modal fixed ${
        isOpen ? "block" : "hidden"
      } inset-0 backdrop-blur-sm flex justify-center items-center`}
    >
      <div className="modal-content bg-transparent border mx-auto my-12 p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Subject</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-text">
            Subject:
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded"
            value={editedSubject.name}
            onChange={(e) =>
              setEditedSubject({ ...editedSubject, name: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-text">Room:</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded"
            value={editedSubject.room}
            onChange={(e) =>
              setEditedSubject({ ...editedSubject, room: e.target.value })
            }
          />
        </div>
        <button
          onClick={handleEditSubject}
          className="bg-success hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Save Changes
        </button>
        <button
          onClick={onRequestClose}
          className="bg-error hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditSubjectModal;
