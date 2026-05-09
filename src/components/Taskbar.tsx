import { useNavigate } from "react-router-dom";
import { defaultWindows } from "../content/routes";
import { useDesktopStore } from "../store/desktopStore";
import { Icon, getWindowIcon } from "./Icon";

export function Taskbar() {
  const navigate = useNavigate();
  const windows = useDesktopStore((state) => state.windows);
  const activeWindowId = useDesktopStore((state) => state.activeWindowId);
  const theme = useDesktopStore((state) => state.theme);
  const setTheme = useDesktopStore((state) => state.setTheme);
  const openWindow = useDesktopStore((state) => state.openWindow);
  const focusWindow = useDesktopStore((state) => state.focusWindow);
  const restoreWindow = useDesktopStore((state) => state.restoreWindow);

  const openLauncher = () => {
    openWindow(defaultWindows.blogIndex);
    navigate(defaultWindows.blogIndex.route);
  };

  const activate = (id: string, route: string) => {
    focusWindow(id);
    restoreWindow(id);
    navigate(route);
  };

  return (
    <nav className="taskbar" aria-label="Desktop taskbar">
      <button className="taskbar__start" type="button" onClick={openLauncher}>
        <Icon name="app" />
        <span>Start</span>
      </button>
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
