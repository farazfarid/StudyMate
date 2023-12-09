import Clock from "./Clock";
import Day from "./Day";
import Weather from "./Weather";
import { styles } from "../../styles";
import Widgets from "./Widgets";
import Modal from "./Modal";
import { useState } from "react";

const Home = () => {
  const initialWidgetData =
    JSON.parse(localStorage.getItem("widgetData")) || [];
  const [widgetData, setWidgetData] = useState(initialWidgetData);
  const [editingWidget, setEditingWidget] = useState(null);

  const handleSaveChanges = (updatedWidget) => {
    setWidgetData((prevData) =>
      prevData.map((widget) =>
        widget.id === updatedWidget.id ? updatedWidget : widget
      )
    );
    setEditingWidget(null);
  };

  const handleDeleteWidget = (id) => {
    setWidgetData((prevData) => prevData.filter((widget) => widget.id !== id));
    setEditingWidget(null);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex py-4 px-2">
        <h2 className={`${styles.heroHeadText} text-center drop-shadow-glow`}>
          Welcome to StudyMate!
        </h2>
      </div>
      <Clock />
      <Day />
      <Weather />
      <div>
        <Widgets
          widgetData={widgetData}
          setWidgetData={setWidgetData}
          editingWidget={editingWidget}
          setEditingWidget={setEditingWidget}
          handleSaveChanges={handleSaveChanges}
        />
        {editingWidget && (
          <Modal
            widget={widgetData.find((widget) => widget.id === editingWidget)}
            onSave={handleSaveChanges}
            onClose={() => setEditingWidget(null)}
            onDelete={handleDeleteWidget}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
