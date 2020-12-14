import React from "react";

import CornerstoneViewport from "react-cornerstone-viewport";
import initCornerstone from "./CornerstoneInitialization";

initCornerstone();

export default function CornerStoneViewPort(props) {
  const tools = [
    {
      name: "Wwwc",
      mode: "active",
      modeOptions: { mouseButtonMask: 1 },
    },
    {
      name: "Zoom",
      mode: "active",
      modeOptions: { mouseButtonMask: 2 },
    },
    {
      name: "Pan",
      mode: "active",
      modeOptions: { mouseButtonMask: 4 },
    },
    // Scroll
    { name: "StackScrollMouseWheel", mode: "active" },
    // Touch
    { name: "PanMultiTouch", mode: "active" },
    { name: "ZoomTouchPinch", mode: "active" },
    { name: "StackScrollMultiTouch", mode: "active" },
  ];

  return (
    <CornerstoneViewport
      tools={tools}
      imageIds={props.imageIds}
      style={{ minWidth: "100%", height: "512px", flex: "1" }}
    />
  );
}
