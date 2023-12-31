import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { PlusIcon, Trash2 } from "lucide-react";

// Helper functions for Local Storage
const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

const Item = ({ text, index, onDelete }) => (
  <Draggable draggableId={text} index={index}>
    {(provided) => (
      <div
        className="text-text bg-black/20 rounded p-2 transition duration-300 ease-out mt-2 hover:bg-white/20 hover:transition hover:duration-100 hover:ease-in flex items-center justify-between"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {text}
        <button onClick={() => onDelete(index)}>
          <Trash2 size={20} color="#F44336" />
        </button>
      </div>
    )}
  </Draggable>
);

const Column = ({ col: { list, id }, onDeleteItem }) => (
  <Droppable droppableId={id}>
    {(provided) => (
      <div className="text-text p-6 flex flex-col mt-2">
        <h2 className="m-0">{id}</h2>
        <div
          className="bg-black/20 rounded-lg p-4 flex flex-col flex-grow mt-1"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {list.map((text, index) => (
            <Item
              key={text}
              text={text}
              index={index}
              onDelete={onDeleteItem}
            />
          ))}
          {provided.placeholder}
        </div>
      </div>
    )}
  </Droppable>
);

const AddTodoInput = ({ value, onChange, onAdd }) => {
  const [animatedText, setAnimatedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const todoOptions = [
    "What to do today?",
    "Preparing for Final Exams: Reviewing Class Notes",
    "Researching and Writing Term Paper on Cognitive Psychology: Exploring Memory",
    "Attending Study Group for Machine Learning",
    "Completing Programming Assignments for Computer Science Class",
    "Reading Required Literature for Literature Class",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimatedText((prevText) => {
        const currentOption = todoOptions[currentIndex];
        const isTypingComplete = prevText === currentOption;

        if (isTypingComplete) {
          clearInterval(intervalId); // Clear the interval to stop typing
          setTimeout(() => {
            setCurrentIndex((prevIndex) =>
              prevIndex === todoOptions.length - 1 ? 0 : prevIndex + 1
            );
            setAnimatedText(""); // Reset animated text for the next typing
          }, 2000); // 2-second delay after typing completion
        }

        return isTypingComplete
          ? prevText
          : currentOption.substring(0, prevText.length + 1);
      });
    }, 100); // Adjust the interval duration for the typing speed

    return () => clearInterval(intervalId);
  }, [currentIndex, todoOptions]);

  return (
    <div className="text-text p-6 flex flex-col relative">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="bg-black/20 rounded p-2 w-full" // Add left and right padding for the icon
          placeholder={animatedText}
        />
        <button
          className="absolute right-2 top-2 w-6 h-6 text-white cursor-pointer"
          onClick={onAdd}
        >
          <PlusIcon size={20} color="#55D86B" />
          {/* Use the Plus icon here */}
        </button>
      </div>
    </div>
  );
};

const ToDo = () => {
  const initialColumns = {
    todo: {
      id: "todo",
      list: getLocalStorage("todo") || [
        "Machine Learning: Lecture 9 Revision",
        "Programming: Java Unit Tests",
        "Reading Harry Potter & The Philosopher's Stone",
      ],
    },
    doing: {
      id: "doing",
      list: getLocalStorage("doing") || [],
    },
    done: {
      id: "done",
      list: getLocalStorage("done") || [],
    },
  };
  const [columns, setColumns] = useState(initialColumns);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    setLocalStorage("todo", columns.todo.list);
    setLocalStorage("doing", columns.doing.list);
    setLocalStorage("done", columns.done.list);
  }, [columns]);

  const handleDeleteItem = (columnId, index) => {
    const updatedList = columns[columnId].list.filter(
      (_, idx) => idx !== index
    );
    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnId]: { ...prevColumns[columnId], list: updatedList },
    }));
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (destination === undefined || destination === null) return null;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      const newList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      newList.splice(destination.index, 0, start.list[source.index]);

      const newCol = {
        id: start.id,
        list: newList,
      };

      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      const newEndList = end.list;

      newEndList.splice(destination.index, 0, start.list[source.index]);

      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;

    const newTodoList = [...columns.todo.list, newTodo];

    const updatedColumns = {
      ...columns,
      todo: { ...columns.todo, list: newTodoList },
    };

    setColumns(updatedColumns);
    setNewTodo("");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-3 m-5 w-full h-full gap-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <Column
            col={columns.todo}
            onDeleteItem={(index) => handleDeleteItem("todo", index)}
          />
          <Column
            col={columns.doing}
            onDeleteItem={(index) => handleDeleteItem("doing", index)}
          />
          <Column
            col={columns.done}
            onDeleteItem={(index) => handleDeleteItem("done", index)}
          />
        </DragDropContext>
      </div>
      <div className="w-full p-1 flex flex-col">
        <AddTodoInput
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onAdd={handleAddTodo}
        />
      </div>
    </div>
  );
};

export default ToDo;
