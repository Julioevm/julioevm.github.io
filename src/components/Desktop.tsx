import { useNavigate } from "react-router-dom";
import { DesktopIcon } from "./DesktopIcon";
import { Taskbar } from "./Taskbar";
import { WindowFrame } from "./WindowFrame";
import { featuredDesktopItems } from "../content/routes";
import { useDesktopStore } from "../store/desktopStore";

export function Desktop() {
  const navigate = useNavigate();
  const windows = useDesktopStore((state) => state.windows);
  const openWindow = useDesktopStore((state) => state.openWindow);
  const theme = useDesktopStore((state) => state.theme);

  const handleOpen = (item: (typeof featuredDesktopItems)[number]) => {
    openWindow(item);
    navigate(item.route);
  };

  return (
    <main className="desktop" aria-label="Portfolio desktop">
      <div className="desktop__wallpaper" />
      <section className="desktop__icons" aria-label="Desktop shortcuts">
        {featuredDesktopItems.map((item) => (
          <DesktopIcon key={item.id} item={item} onOpen={() => handleOpen(item)} />
        ))}
      </section>
      <section className="desktop__stage" aria-label="Open windows">
        {windows.map((window) => (
          <WindowFrame key={window.id} window={window} />
        ))}
      </section>
      <div className="desktop__status" aria-live="polite">
        <span>OS Portfolio</span>
        <span>{theme === "dark" ? "Dark" : "Light"} mode</span>
      </div>
      <Taskbar />
    </main>
  );
}
