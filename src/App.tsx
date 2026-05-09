import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Desktop } from "./components/Desktop";
import { getRouteWindow } from "./content/routes";
import { useDesktopStore } from "./store/desktopStore";

export default function App() {
  const location = useLocation();
  const pathname = location.pathname;
  const openWindow = useDesktopStore((state) => state.openWindow);
  const setTheme = useDesktopStore((state) => state.setTheme);
  const theme = useDesktopStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const routeWindow = getRouteWindow(pathname);
    if (routeWindow) {
      openWindow(routeWindow);
    }
  }, [pathname, openWindow]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    if (theme === "system") {
      setTheme(media.matches ? "dark" : "light");
    }
  }, [setTheme, theme]);

  return <Desktop />;
}
