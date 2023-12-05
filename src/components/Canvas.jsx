import React from "react";
import { useOnDraw } from "./hooks";

const Canvas = ({ width, height }) => {
  const setCanvasRef = useOnDraw(onDraw);

  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, "#000000", 5);
    // ctx.stroke();
  }

  function drawLine(start, end, ctx, color, width) {
    start = start ?? end;
    ctx.beginPath(); 
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <canvas
      ref={setCanvasRef}
      height={height}
      width={width}
      style={canvasStyle}
    >
      Canvas
    </canvas>
  );
};

export default Canvas;

const canvasStyle = {
  border: "1px solid black",
};
