// src/components/TimetableBody.js
import React from "react";
import TimetableGrid from "./TimetableGrid";

const TimetableBody = ({
  subjects,
  onSelectSubject,
  selectedSubject,
  onEditSubject,
  onDeleteSubject,
}) => {
  return (
    <div className="grid grid-cols-8 gap-2 mt-4">
      <TimetableGrid
        subjects={subjects}
        onSelectSubject={onSelectSubject}
        selectedSubject={selectedSubject}
        onEditSubject={onEditSubject}
        onDeleteSubject={onDeleteSubject}
      />
    </div>
  );
};

export default TimetableBody;
