// src/components/TimetableCell.js
import React, { useState } from "react";
import EditSubjectModal from "./EditSubjectModal";

const TimetableCell = ({
  subject,
  onSelectSubject,
  isSelected,
  onEditSubject,
  onDeleteSubject,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDeleteSubject(subject.id);
  };

  return (
    <>
      <div
        className={`relative p-2 border cursor-pointer ${
          isSelected ? "bg-blue-300" : ""
        }`}
        onClick={() => {
          onSelectSubject(subject);
          setIsMenuOpen(!isMenuOpen);
        }}
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <div>{subject.name}</div>
        <div>{subject.room}</div>
        {isMenuOpen && (
          <div className="absolute top-0 right-0 p-1">
            <button
              className="text-xs text-blue-500 mr-1"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="text-xs text-red-500"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <EditSubjectModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        subject={subject}
        onEditSubject={onEditSubject}
      />
    </>
  );
};

export default TimetableCell;
