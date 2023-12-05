import { useEffect, useRef } from "react";

export function useOnDraw(onDraw) {
  const canvasRef = useRef(null);

  const isDrawingRef = useRef(false);

  const mouseMoveListenerRef = useRef(null);
  const mouseDownListenerRef = useRef(null);
  const mouseUpListenerRef = useRef(null);
  const prevPointRef = useRef(null);
  

  function setCanvasRef(ref) {
    if (!ref) return;

    if (canvasRef.current) {
      canvasRef.current.removeEventListener(
        "mousedown",
        mouseDownListenerRef.current
      );
    }

    canvasRef.current = ref;
    initMouseMoveListener();
    initMouseDownListener();
    initMouseUpListener();
  }

  function initMouseMoveListener() {
    const mouseMoveListener = (e) => {
      if (isDrawingRef.current) {
        
        const point = computePointInCanvas(e.clientX, e.clientY);
        
        const ctx = canvasRef.current.getContext("2d");
        
        if (onDraw) onDraw(ctx, point, prevPointRef.current);
        prevPointRef.current = point;
      }
    };
    mouseMoveListenerRef.current = mouseMoveListener;
    window.addEventListener("mousemove", mouseMoveListener);
  }

  function initMouseDownListener() {
    if (!canvasRef.current) return;

    const mouseDownListener = (e) => {
      isDrawingRef.current = true;
    };

    mouseDownListenerRef.current = mouseDownListener;
    canvasRef.current.addEventListener("mousedown", mouseDownListener);
  }

  function initMouseUpListener() {
    if (!canvasRef.current) return;

    const mouseUpListener = () => {
      isDrawingRef.current = false;
      prevPointRef.current = null;
    };
    mouseUpListenerRef.current = mouseUpListener;
    window.addEventListener("mouseup", mouseUpListener);
  }

  function computePointInCanvas(clientX, clientY) {
    if (canvasRef.current) {
      const boudingRect = canvasRef.current.getBoundingClientRect();
      return {
        x: clientX - boudingRect.left,
        y: clientY - boudingRect.top,
      };
    } else {
      return null;
    }
  }

  return setCanvasRef;
}
