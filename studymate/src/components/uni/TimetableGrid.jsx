// src/components/TimetableGrid.js
import React from "react";
import TimetableCell from "./TimetableCell";

const TimetableGrid = ({
  subjects,
  onSelectSubject,
  selectedSubject,
  onEditSubject,
  onDeleteSubject,
}) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Group subjects by day
  const subjectsByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = subjects.filter((subject) => subject.day === day);
    return acc;
  }, {});

  return (
    <>
      {/* Render Days of Week */}
      {daysOfWeek.map((day) => (
        <div key={day} className="bg-gray-200 p-2 text-center font-bold">
          {day}
          {subjectsByDay[day].map((subject) => (
            <TimetableCell
              key={subject.id}
              subject={subject}
              onSelectSubject={onSelectSubject}
              isSelected={selectedSubject && selectedSubject.id === subject.id}
              onEditSubject={onEditSubject}
              onDeleteSubject={onDeleteSubject}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default TimetableGrid;
