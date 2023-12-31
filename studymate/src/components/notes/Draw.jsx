import { Excalidraw } from "@excalidraw/excalidraw";

export default function Draw() {
  return (
    <div className="flex items-center justify-center flex-col p-12">
      <h1 className="heroHeadText">Excalidraw</h1>
      <div
        style={{ width: "75vw", height: "75vh" }}
        className="overflow-hidden"
      >
        <Excalidraw
          UIOptions={{
            canvasActions: {
              toggleTheme: true,
            },
          }}
          theme={
            document.documentElement.classList.contains("dark")
              ? "light"
              : "dark"
          }
        />
      </div>
    </div>
  );
}
