import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { featuredDesktopItems } from "../content/routes";
import { useDesktopStore } from "../store/desktopStore";
import { Icon, getWindowIcon } from "./Icon";

export function Taskbar() {
  const navigate = useNavigate();
  const [isStartOpen, setIsStartOpen] = useState(false);
  const startMenuRef = useRef<HTMLDivElement>(null);
  const windows = useDesktopStore((state) => state.windows);
  const activeWindowId = useDesktopStore((state) => state.activeWindowId);
  const theme = useDesktopStore((state) => state.theme);
  const setTheme = useDesktopStore((state) => state.setTheme);
  const openWindow = useDesktopStore((state) => state.openWindow);
  const focusWindow = useDesktopStore((state) => state.focusWindow);
  const restoreWindow = useDesktopStore((state) => state.restoreWindow);

  useEffect(() => {
    if (!isStartOpen) {
      return;
    }

    const closeOnPointerDown = (event: PointerEvent) => {
      if (!startMenuRef.current?.contains(event.target as Node)) {
        setIsStartOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsStartOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnPointerDown);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnPointerDown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isStartOpen]);

  const activate = (id: string, route: string) => {
    focusWindow(id);
    restoreWindow(id);
    navigate(route);
  };

  const openMenuItem = (item: (typeof featuredDesktopItems)[number]) => {
    openWindow(item);
    navigate(item.route);
    setIsStartOpen(false);
  };

  return (
    <nav className="taskbar" aria-label="Desktop taskbar">
      <div className="taskbar__start-wrap" ref={startMenuRef}>
        {isStartOpen ? (
          <div className="start-menu" role="menu" aria-label="Start menu">
            <div className="start-menu__rail" aria-hidden="true">
              <span>Portfolio</span>
            </div>
            <div className="start-menu__items">
              {featuredDesktopItems.map((item) => (
                <button
                  className="start-menu__item"
                  key={item.id}
                  type="button"
                  role="menuitem"
                  onClick={() => openMenuItem(item)}
                >
                  <span className="start-menu__icon">
                    <Icon name={getWindowIcon(item.kind)} />
                  </span>
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <button
          className="taskbar__start"
          type="button"
          onClick={() => setIsStartOpen((open) => !open)}
          aria-expanded={isStartOpen}
          aria-haspopup="menu"
        >
          <Icon name="app" />
          <span>Start</span>
        </button>
      </div>
      <div className="taskbar__windows" aria-label="Open windows">
        {windows.map((window) => (
          <button
            className="taskbar__item"
            data-active={activeWindowId === window.id}
            data-minimized={window.isMinimized}
            key={window.id}
            type="button"
            onClick={() => activate(window.id, window.route)}
          >
            <Icon name={getWindowIcon(window.kind)} />
            <span>{window.title}</span>
          </button>
        ))}
      </div>
      <button
        className="taskbar__theme"
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      >
        <Icon name={theme === "dark" ? "sun" : "moon"} />
      </button>
    </nav>
  );
}
