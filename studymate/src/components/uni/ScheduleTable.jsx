// components/ScheduleTable.js
import React from "react";

const ScheduleTable = ({ schedule, onDelete }) => {
  // Function to get the index of a day in the days array
  const getDayIndex = (days, targetDay) => {
    return days.findIndex((day) => day.day === targetDay);
  };

  return (
    <table className="table-auto w-full mt-4">
      {/* Table headers */}
      <thead>
        <tr>
          <th className="w-1/6">Time</th>
          <th className="w-1/6">Sunday</th>
          <th className="w-1/6">Monday</th>
          <th className="w-1/6">Tuesday</th>
          <th className="w-1/6">Wednesday</th>
          <th className="w-1/6">Thursday</th>
          <th className="w-1/6">Friday</th>
          <th className="w-1/6">Saturday</th>
        </tr>
      </thead>

      {/* Table body */}
      <tbody>
        {/* Render each row for the schedule */}
        {schedule.map((subject, index) => (
          <tr key={index}>
            <td>{subject.time}</td>
            {[
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ].map((day) => (
              <td key={day} className="relative">
                {/* Find the index of the day in the subject.days array */}
                const dayIndex = getDayIndex(subject.days, day);
                {dayIndex !== -1 && (
                  <div>
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => onDelete(index)}
                    >
                      Delete
                    </button>
                    <div className="text-sm">
                      {subject.days[dayIndex].subject} -{" "}
                      {subject.days[dayIndex].room}
                    </div>
                  </div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScheduleTable;
