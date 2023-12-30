// src/components/TimetableHeader.js
import React, { useState } from "react";
import AddSubjectModal from "./AddSubjectModal";

const TimetableHeader = ({ onAddSubject }) => {
  const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] = useState(false);

  const openAddSubjectModal = () => {
    setIsAddSubjectModalOpen(true);
  };

  const closeAddSubjectModal = () => {
    setIsAddSubjectModalOpen(false);
  };

  return (
    <div className="flex justify-between items-center bg-blue-500 p-2 text-white">
      <h2 className="text-xl font-bold">School Timetable</h2>
      <button
        onClick={onAddSubject}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Add Subject
      </button>
      <AddSubjectModal
        isOpen={isAddSubjectModalOpen}
        onRequestClose={closeAddSubjectModal}
        onAddSubject={(subject) => {
          onAddSubject(subject);
          closeAddSubjectModal();
        }}
      />
    </div>
  );
};

export default TimetableHeader;
