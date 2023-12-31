import { Blocks, Save, Trash2, X } from "lucide-react";
import React, { useState } from "react";

const Modal = ({ widget, onSave, onClose, onDelete }) => {
  const [editedWidget, setEditedWidget] = useState(widget);

  const handleSave = () => {
    onSave(editedWidget);
    onClose();
  };

  const handleChange = (field, value) => {
    setEditedWidget((prevWidget) => ({ ...prevWidget, [field]: value }));
  };

  return (
    <div className="text-text fixed inset-0 flex items-center justify-center bg-black/85">
      <div className="flex flex-col bg-black w-4/5 h-2/5 lg:w-1/2 p-4 rounded-3xl shadow-md backdrop-blur-3xl items-center">
        <div className="flex items-center ml-auto">
          <button
            onClick={onClose}
            className="text-text hover:text-gray-300 focus:outline-none hover:bg-white/10 rounded-full p-1"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex items-center justify-center mb-4">
          <Blocks className="h-24 w-24 text-text" />
        </div>
        <input
          type="text"
          placeholder="Name"
          value={editedWidget.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full bg-transparent text-text border-gray-300 border-2 rounded-md p-3 mb-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-gray-100 dark:border-gray-800 dark:hover:border-gray-950 dark:focus:border-transparent"
        />
        <input
          type="text"
          placeholder="URL"
          value={editedWidget.link}
          onChange={(e) => handleChange("link", e.target.value)}
          className="w-full bg-transparent text-text border-gray-300 border-2 rounded-md p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-gray-100 dark:border-gray-800 dark:hover:border-gray-950 dark:focus:border-transparent"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-success text-text p-2 rounded-md hover:bg-green-600 mr-2"
          >
            <Save className="h-6 w-6 m-2" />
          </button>
          <button
            onClick={() => {
              onDelete(widget.id);
              onClose();
            }}
            className="bg-error text-text p-2 rounded-md hover:bg-red-800"
          >
            <Trash2 className="h-6 w-6 m-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
