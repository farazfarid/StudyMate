import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Task 1" },
    "task-2": { id: "task-2", content: "Task 2" },
    "task-3": { id: "task-3", content: "Task 3" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

function Task({ task, handleDelete, provided }) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="p-2 m-2 bg-blue-200 rounded shadow flex justify-between items-center"
    >
      <span>{task.content}</span>
      <button
        onClick={() => handleDelete(task.id)}
        className="bg-red-500 text-white p-1 rounded"
      >
        Delete
      </button>
    </div>
  );
}

function Column({ column, tasks, handleDelete }) {
  return (
    <div className="flex flex-col w-1/3 p-4 bg-gray-100 rounded shadow-lg m-2">
      <h3 className="text-lg font-bold mb-4">{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <Task
                    task={task}
                    handleDelete={handleDelete}
                    provided={provided}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

function ToDo() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("taskData")) || initialData
  );
  const [newTaskContent, setNewTaskContent] = useState("");

  useEffect(() => {
    localStorage.setItem("taskData", JSON.stringify(data));
  }, [data]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setData(newData);
  };

  const addTask = () => {
    const newTaskId = `task-${Date.now()}`;
    const newTask = {
      id: newTaskId,
      content: newTaskContent,
    };

    setData((prevData) => ({
      ...prevData,
      tasks: {
        ...prevData.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...prevData.columns,
        "column-1": {
          ...prevData.columns["column-1"],
          taskIds: [...prevData.columns["column-1"].taskIds, newTaskId],
        },
      },
    }));

    setNewTaskContent("");
  };

  const handleDelete = (id) => {
    const newTasks = { ...data.tasks };
    delete newTasks[id];

    const newColumns = { ...data.columns };
    Object.values(newColumns).forEach((column) => {
      const index = column.taskIds.indexOf(id);
      if (index > -1) {
        column.taskIds.splice(index, 1);
      }
    });

    setData({
      tasks: newTasks,
      columns: newColumns,
      columnOrder: data.columnOrder,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Draggable draggableId="draggable" index={0}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <div className="flex justify-around">
                    {data.columnOrder.map((columnId) => {
                      const column = data.columns[columnId];
                      const tasks = column.taskIds.map(
                        (taskId) => data.tasks[taskId]
                      );

                      return (
                        <Column
                          key={column.id}
                          column={column}
                          tasks={tasks}
                          handleDelete={handleDelete}
                        />
                      );
                    })}
                  </div>
                  <div className="flex mt-4">
                    <input
                      type="text"
                      value={newTaskContent}
                      onChange={(e) => setNewTaskContent(e.target.value)}
                      className="border p-2 flex-grow"
                      placeholder="New task content"
                    />
                    <button
                      onClick={addTask}
                      className="bg-blue-500 text-white p-2 ml-2"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              )}
            </Draggable>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ToDo;
