import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { featuredDesktopItems } from "../content/routes";
import { useDesktopStore } from "../store/desktopStore";
import { Icon, getWindowIcon } from "./Icon";

type StartMenuSection = {
  id: string;
  title: string;
  icon: Parameters<typeof Icon>[0]["name"];
  items: typeof featuredDesktopItems;
};

type StartMenuAction = {
  item: (typeof featuredDesktopItems)[number];
  icon: Parameters<typeof Icon>[0]["name"];
};

const getMenuItem = (id: string) => featuredDesktopItems.find((item) => item.id === id);
const compactMenuItems = (items: Array<(typeof featuredDesktopItems)[number] | undefined>) =>
  items.filter((item): item is (typeof featuredDesktopItems)[number] => Boolean(item));

const blogItems = featuredDesktopItems.filter((item) => item.kind === "blog");
const projectItems = featuredDesktopItems.filter((item) => item.kind === "project");
const documentItems = compactMenuItems([
  getMenuItem("project:os-portfolio"),
  getMenuItem("project:markdown-workbench")
]);
const startMenuActions = compactMenuItems([getMenuItem("about"), getMenuItem("contact")]).map(
  (item): StartMenuAction => ({
    item,
    icon: getWindowIcon(item.kind)
  })
);

const startMenuSections: StartMenuSection[] = [
  {
    id: "blog",
    title: "Blog",
    icon: "article",
    items: compactMenuItems([getMenuItem("blog"), ...blogItems])
  },
  {
    id: "projects",
    title: "Projects",
    icon: "folderCode",
    items: compactMenuItems([getMenuItem("projects"), ...projectItems])
  },
  {
    id: "documents",
    title: "Documents",
    icon: "article",
    items: documentItems
  },
  {
    id: "tools",
    title: "Tools",
    icon: "app",
    items: []
  },
  {
    id: "games",
    title: "Games",
    icon: "app",
    items: []
  }
];

export function Taskbar() {
  const navigate = useNavigate();
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [activeStartSectionId, setActiveStartSectionId] = useState<string | null>(null);
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

  const activeStartSection =
    startMenuSections.find((section) => section.id === activeStartSectionId) ?? null;

  const toggleStartMenu = () => {
    setIsStartOpen((open) => {
      const nextOpen = !open;
      if (nextOpen) {
        setActiveStartSectionId(null);
      }
      return nextOpen;
    });
  };

  return (
    <nav className="taskbar" aria-label="Desktop taskbar">
      <div className="taskbar__start-wrap" ref={startMenuRef}>
        {isStartOpen ? (
          <div className="start-menu" data-submenu-open={Boolean(activeStartSection)} role="menu" aria-label="Start menu">
            <div className="start-menu__rail" aria-hidden="true">
              <span>Portfolio</span>
            </div>
            <div className="start-menu__items">
              {startMenuActions.map(({ item, icon }) => (
                <button
                  className="start-menu__action"
                  key={item.id}
                  type="button"
                  role="menuitem"
                  onFocus={() => setActiveStartSectionId(null)}
                  onMouseEnter={() => setActiveStartSectionId(null)}
                  onClick={() => openMenuItem(item)}
                >
                  <span className="start-menu__icon">
                    <Icon name={icon} />
                  </span>
                  <span>{item.title}</span>
                </button>
              ))}
              <div className="start-menu__divider" aria-hidden="true" />
              {startMenuSections.map((section) => (
                <button
                  className="start-menu__section"
                  data-active={activeStartSection?.id === section.id}
                  key={section.id}
                  type="button"
                  role="menuitem"
                  aria-haspopup="menu"
                  aria-expanded={activeStartSection?.id === section.id}
                  onClick={() => setActiveStartSectionId(section.id)}
                  onFocus={() => setActiveStartSectionId(section.id)}
                  onMouseEnter={() => setActiveStartSectionId(section.id)}
                >
                  <span className="start-menu__icon">
                    <Icon name={section.icon} />
                  </span>
                  <span>{section.title}</span>
                  <span className="start-menu__chevron" aria-hidden="true">
                    {">"}
                  </span>
                </button>
              ))}
            </div>
            {activeStartSection ? (
              <div className="start-menu__submenu" role="menu" aria-label={`${activeStartSection.title} menu`}>
                <div className="start-menu__submenu-title">{activeStartSection.title}</div>
                {activeStartSection.items.length > 0 ? (
                  activeStartSection.items.map((item) => (
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
                  ))
                ) : (
                  <p className="start-menu__empty">Empty</p>
                )}
              </div>
            ) : null}
          </div>
        ) : null}
        <button
          className="taskbar__start"
          type="button"
          onClick={toggleStartMenu}
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
