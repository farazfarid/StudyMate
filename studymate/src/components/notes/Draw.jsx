import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

import React from "react";

export default function Draw() {
  return (
    <div className="flex items-center justify-center flex-col bg-white-100 bg-opacity-80 dark:bg-neutral-900 bg-hero-light dark:bg-hero-dark bg-cover bg-center transition ease-in-out duration-300">
      <div style={{ position: "fixed", inset: 0 }}>
        <Tldraw />
      </div>
    </div>
  );
}
