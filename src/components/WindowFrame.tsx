import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { WindowContent } from "./WindowContent";
import { useDesktopStore, type DesktopWindow } from "../store/desktopStore";

type DragMode =
  | { type: "move"; startX: number; startY: number; x: number; y: number }
  | {
      type: "resize";
      edge: string;
      startX: number;
      startY: number;
      x: number;
      y: number;
      width: number;
      height: number;
    };

type WindowFrameProps = {
  window: DesktopWindow;
};

const minWidth = 320;
const minHeight = 240;

export function WindowFrame({ window }: WindowFrameProps) {
  const navigate = useNavigate();
  const drag = useRef<DragMode | null>(null);
  const closeWindow = useDesktopStore((state) => state.closeWindow);
  const focusWindow = useDesktopStore((state) => state.focusWindow);
  const minimizeWindow = useDesktopStore((state) => state.minimizeWindow);
  const toggleMaximizeWindow = useDesktopStore((state) => state.toggleMaximizeWindow);
  const moveWindow = useDesktopStore((state) => state.moveWindow);
  const resizeWindow = useDesktopStore((state) => state.resizeWindow);
  const activeWindowId = useDesktopStore((state) => state.activeWindowId);

  if (window.isMinimized) {
    return null;
  }

  const startMove = (event: React.PointerEvent) => {
    if (event.button !== 0 || window.isMaximized) {
      return;
    }

    focusWindow(window.id);
    drag.current = {
      type: "move",
      startX: event.clientX,
      startY: event.clientY,
      x: window.x,
      y: window.y
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const startResize = (event: React.PointerEvent, edge: string) => {
    event.stopPropagation();
    if (event.button !== 0 || window.isMaximized) {
      return;
    }

    focusWindow(window.id);
    drag.current = {
      type: "resize",
      edge,
      startX: event.clientX,
      startY: event.clientY,
      x: window.x,
      y: window.y,
      width: window.width,
      height: window.height
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    const activeDrag = drag.current;
    if (!activeDrag) {
      return;
    }

    const deltaX = event.clientX - activeDrag.startX;
    const deltaY = event.clientY - activeDrag.startY;

    if (activeDrag.type === "move") {
      moveWindow(window.id, Math.max(8, activeDrag.x + deltaX), Math.max(8, activeDrag.y + deltaY));
      return;
    }

    let nextX = activeDrag.x;
    let nextY = activeDrag.y;
    let nextWidth = activeDrag.width;
    let nextHeight = activeDrag.height;

    if (activeDrag.edge.includes("e")) {
      nextWidth = Math.max(minWidth, activeDrag.width + deltaX);
    }

    if (activeDrag.edge.includes("s")) {
      nextHeight = Math.max(minHeight, activeDrag.height + deltaY);
    }

    if (activeDrag.edge.includes("w")) {
      const width = Math.max(minWidth, activeDrag.width - deltaX);
      nextX = activeDrag.x + (activeDrag.width - width);
      nextWidth = width;
    }

    if (activeDrag.edge.includes("n")) {
      const height = Math.max(minHeight, activeDrag.height - deltaY);
      nextY = activeDrag.y + (activeDrag.height - height);
      nextHeight = height;
    }

    resizeWindow(window.id, nextWidth, nextHeight, nextX, nextY);
  };

  const endDrag = (event: React.PointerEvent) => {
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleClose = () => {
    closeWindow(window.id);
    navigate("/");
  };

  const style = window.isMaximized
    ? undefined
    : {
        transform: `translate(${window.x}px, ${window.y}px)`,
        width: window.width,
        height: window.height,
        zIndex: window.zIndex
      };

  return (
    <article
      className="window"
      data-active={activeWindowId === window.id}
      data-maximized={window.isMaximized}
      style={window.isMaximized ? { zIndex: window.zIndex } : style}
      onPointerDown={() => focusWindow(window.id)}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      aria-label={window.title}
    >
      <header className="window__titlebar" onPointerDown={startMove} onDoubleClick={() => toggleMaximizeWindow(window.id)}>
        <div className="window__title">
          <span className="window__dot" aria-hidden="true" />
          {window.title}
        </div>
        <div className="window__controls">
          <button type="button" aria-label="Minimize" onClick={() => minimizeWindow(window.id)}>
            -
          </button>
          <button type="button" aria-label="Maximize" onClick={() => toggleMaximizeWindow(window.id)}>
            {window.isMaximized ? "[]" : "[ ]"}
          </button>
          <button type="button" aria-label="Close" onClick={handleClose}>
            x
          </button>
        </div>
      </header>
      <div className="window__body">
        <WindowContent window={window} />
      </div>
      {["n", "e", "s", "w", "ne", "se", "sw", "nw"].map((edge) => (
        <span
          aria-hidden="true"
          className={`window__resize window__resize--${edge}`}
          key={edge}
          onPointerDown={(event) => startResize(event, edge)}
        />
      ))}
    </article>
  );
}
