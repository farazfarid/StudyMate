import { Excalidraw } from "@excalidraw/excalidraw";

export default function Draw() {
  return (
    <div className="flex items-center justify-center flex-col p-12">
      <h1 className="heroHeadText">Excalidraw</h1>
      <div
        style={{ width: "75vw", height: "70vh" }}
        className="overflow-hidden"
      >
        <Excalidraw
          UIOptions={{
            canvasActions: {
              toggleTheme: true,
            },
          }}
          theme="light"
        />
      </div>
    </div>
  );
}
