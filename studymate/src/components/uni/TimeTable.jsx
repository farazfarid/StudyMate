// src/components/Timetable.js
import React, { useState } from "react";
import TimetableHeader from "./TimetableHeader";
import TimetableBody from "./TimetableBody";
import AddSubjectModal from "./AddSubjectModal";

const Timetable = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] = useState(false);

  const addSubject = (subject) => {
    setSubjects([...subjects, subject]);
  };

  const editSubject = (editedSubject) => {
    const updatedSubjects = subjects.map((s) =>
      s.id === editedSubject.id ? editedSubject : s
    );
    setSubjects(updatedSubjects);
    setSelectedSubject(null);
  };

  const deleteSubject = (id) => {
    const updatedSubjects = subjects.filter((s) => s.id !== id);
    setSubjects(updatedSubjects);
    setSelectedSubject(null);
  };

  return (
    <div className="container mx-auto mt-5">
      <TimetableHeader onAddSubject={() => setIsAddSubjectModalOpen(true)} />
      <TimetableBody
        subjects={subjects}
        onEditSubject={editSubject}
        onDeleteSubject={deleteSubject}
        onSelectSubject={setSelectedSubject}
        selectedSubject={selectedSubject}
      />
      <AddSubjectModal
        isOpen={isAddSubjectModalOpen}
        onRequestClose={() => setIsAddSubjectModalOpen(false)}
        onAddSubject={addSubject}
      />
    </div>
  );
};

export default Timetable;
