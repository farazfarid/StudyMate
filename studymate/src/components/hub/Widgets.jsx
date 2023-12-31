import { useEffect } from "react";
import { Pencil, PlusCircle } from "lucide-react";

const Widgets = ({
  widgetData,
  setWidgetData,
  editingWidget,
  setEditingWidget,
}) => {
  const MAX_WIDGETS = 5;

  useEffect(() => {
    localStorage.setItem("widgetData", JSON.stringify(widgetData));
  }, [widgetData]);

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
  };

  const handleToggleDetails = (id) => {
    setEditingWidget((prev) => (prev === id ? null : id));
  };

  const handleAddWidget = () => {
    if (widgetData.length < MAX_WIDGETS) {
      const newWidget = {
        id: widgetData.length + 1,
        title: "",
        link: "",
        showDetails: true,
      };
      setWidgetData((prevData) => [...prevData, newWidget]);
      setEditingWidget(newWidget.id);
    }
  };

  return (
    <div className="text-text grid grid-cols-1 md:grid-cols-5 gap-4">
      {widgetData.map((widget) => (
        <div
          key={widget.id}
          className="mb-4 relative overflow-hidden bg-white dark:bg-black/40 bg-opacity-40 backdrop-blur-md p-4 rounded-md shadow-md hover:scale-110 transition ease-in-out duration-300"
        >
          <div className="flex flex-col items-center justify-center">
            <a
              href={widget.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 mx-4 w-8 h-8"
            >
              {widget.link ? (
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={`https://www.google.com/s2/favicons?sz=48&domain=${widget.link}`}
                    alt="Favicon"
                    className="object-contain w-full h-full"
                  />
                  <p className="pt-2 text-sm">{widget.title}</p>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-300"></div>
              )}
            </a>
            {!editingWidget && (
              <div
                className="absolute top-1 right-1 cursor-pointer hover:bg-black/20 rounded-full"
                onClick={() => handleToggleDetails(widget.id)}
              >
                <Pencil
                  color="white"
                  fillOpacity={0.5}
                  fill="white"
                  className="h-6 w-6 px-1 text-gray-800"
                />
              </div>
            )}
          </div>
        </div>
      ))}
      {widgetData.length < MAX_WIDGETS && (
        <div className="mb-4 relative overflow-hidden bg-white dark:bg-black/40 bg-opacity-40 backdrop-blur-md p-4 rounded-md shadow-md hover:scale-110 hover:bg-black/40 dark:hover:bg-white/40 transition ease-in-out duration-300">
          <button
            onClick={handleAddWidget}
            className="flex flex-col items-center"
          >
            <PlusCircle className="h-9 w-9 px-1 text-text" />
            <p className="pt-2 text-sm">Add Widget</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default Widgets;
