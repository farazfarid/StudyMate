import { Excalidraw } from "@excalidraw/excalidraw";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

import React from "react";

export default function Draw() {
  return (
    <div className="flex items-center justify-center flex-col p-12">
      <h1 className="heroHeadText">Excalidraw</h1>
      <div style={{ width: "75vw", height: "75vh" }}>
        <Excalidraw theme="light" />
      </div>
    </div>
  );
}
