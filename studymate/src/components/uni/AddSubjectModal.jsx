// src/components/AddSubjectModal.js
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const AddSubjectModal = ({ isOpen, onRequestClose, onAddSubject }) => {
  const [subject, setSubject] = useState("");
  const [room, setRoom] = useState("");
  const [day, setDay] = useState("Mon");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  const handleAddSubject = () => {
    const newSubject = {
      id: uuid(),
      name: subject,
      room,
      day,
      startTime,
      endTime,
    };
    onAddSubject(newSubject);
    onRequestClose();
    setSubject("");
    setRoom("");
    setDay("Mon");
    setStartTime("09:00");
    setEndTime("10:00");
  };

  return (
    <div
      className={`modal fixed ${
        isOpen ? "block" : "hidden"
      } inset-0 backdrop-blur-sm flex justify-center items-center`}
    >
      <div className="modal-content border rounded-mdmx-auto my-12 p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Subject</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-text">
            Subject:
          </label>
          <input
            type="text"
            className="bg-transparent mt-1 p-2 w-full border rounded"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-text">Room:</label>
          <input
            type="text"
            className="bg-transparent mt-1 p-2 w-full border rounded"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-text">Day:</label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="bg-transparent mt-1 p-2 w-full border rounded"
          >
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <option className="text-black" key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-text">Time:</label>
          <div className="flex">
            <input
              type="time"
              className="bg-transparent text-text mt-1 p-2 border rounded"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <span className="mx-2">to</span>
            <input
              type="time"
              className="bg-transparent text-text mt-1 p-2 border rounded"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={handleAddSubject}
          className="bg-success hover:bg-green-600 text-text font-bold py-2 px-4 rounded"
        >
          Add Subject
        </button>
        <button
          onClick={onRequestClose}
          className="bg-error hover:bg-red-600 text-text font-bold py-2 px-4 rounded ml-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddSubjectModal;
