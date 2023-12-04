import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

import React from "react";

export default function Draw() {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw inferDarkMode />
    </div>
  );
}
