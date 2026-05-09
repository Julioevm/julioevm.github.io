import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Desktop } from "./components/Desktop";
import { getRouteWindow } from "./content/routes";
import { Theme, useDesktopStore } from "./store/desktopStore";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const resolveTheme = (theme: Theme) => (theme === "system" ? getSystemTheme() : theme);

export default function App() {
  const location = useLocation();
  const pathname = location.pathname;
  const openWindow = useDesktopStore((state) => state.openWindow);
  const theme = useDesktopStore((state) => state.theme);

  useEffect(() => {
    const applyTheme = () => {
      const resolvedTheme = resolveTheme(theme);
      document.documentElement.dataset.theme = resolvedTheme;
      document.documentElement.style.colorScheme = resolvedTheme;
    };

    applyTheme();

    if (theme !== "system") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", applyTheme);

    return () => {
      media.removeEventListener("change", applyTheme);
    };
  }, [theme]);

  useEffect(() => {
    const routeWindow = getRouteWindow(pathname);
    if (routeWindow) {
      openWindow(routeWindow);
    }
  }, [pathname, openWindow]);

  return <Desktop />;
}
