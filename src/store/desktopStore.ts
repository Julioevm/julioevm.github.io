import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";
export type WindowKind =
  | "welcome"
  | "blog"
  | "blogIndex"
  | "folder"
  | "project"
  | "projectIndex"
  | "game"
  | "resume"
  | "about"
  | "contact";

export type DesktopWindow = {
  id: string;
  kind: WindowKind;
  title: string;
  route: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
};

export type WindowSeed = Pick<DesktopWindow, "id" | "kind" | "title" | "route"> &
  Partial<Pick<DesktopWindow, "x" | "y" | "width" | "height">>;

type DesktopState = {
  theme: Theme;
  windows: DesktopWindow[];
  activeWindowId: string | null;
  nextZIndex: number;
  shouldShowWelcome: boolean;
  hasSeenWelcomeThisSession: boolean;
  setTheme: (theme: Theme) => void;
  setShouldShowWelcome: (shouldShowWelcome: boolean) => void;
  openWindow: (window: WindowSeed) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, width: number, height: number, x?: number, y?: number) => void;
};

const defaultWindow = (window: WindowSeed, index: number, zIndex: number): DesktopWindow => ({
  id: window.id,
  kind: window.kind,
  title: window.title,
  route: window.route,
  x: window.x ?? 80 + (index % 5) * 34,
  y: window.y ?? 72 + (index % 4) * 30,
  width: window.width ?? 760,
  height: window.height ?? 520,
  zIndex,
  isMinimized: false,
  isMaximized: false
});

const welcomeSessionStorageKey = "os-portfolio-welcome-seen-this-session";

const getHasSeenWelcomeThisSession = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem(welcomeSessionStorageKey) === "true";
};

const markWelcomeSeenThisSession = () => {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(welcomeSessionStorageKey, "true");
  }
};

export const useDesktopStore = create<DesktopState>()(
  persist(
    (set, get) => ({
      theme: "system",
      windows: [],
      activeWindowId: null,
      nextZIndex: 10,
      shouldShowWelcome: true,
      hasSeenWelcomeThisSession: getHasSeenWelcomeThisSession(),
      setTheme: (theme) => set({ theme }),
      setShouldShowWelcome: (shouldShowWelcome) => {
        if (!shouldShowWelcome) {
          markWelcomeSeenThisSession();
        }

        set({
          shouldShowWelcome,
          hasSeenWelcomeThisSession: shouldShowWelcome
            ? getHasSeenWelcomeThisSession()
            : true
        });
      },
      openWindow: (windowSeed) => {
        const existing = get().windows.find((window) => window.id === windowSeed.id);
        if (existing) {
          get().focusWindow(existing.id);
          get().restoreWindow(existing.id);
          return;
        }

        const zIndex = get().nextZIndex;
        set((state) => ({
          windows: [...state.windows, defaultWindow(windowSeed, state.windows.length, zIndex)],
          activeWindowId: windowSeed.id,
          nextZIndex: zIndex + 1
        }));
      },
      closeWindow: (id) =>
        set((state) => {
          if (id === "welcome") {
            markWelcomeSeenThisSession();
          }

          const windows = state.windows.filter((window) => window.id !== id);
          const activeWindowId =
            state.activeWindowId === id
              ? windows.reduce<DesktopWindow | null>(
                  (topWindow, window) =>
                    topWindow && topWindow.zIndex > window.zIndex ? topWindow : window,
                  null
                )?.id ?? null
              : state.activeWindowId;
          return {
            windows,
            activeWindowId,
            hasSeenWelcomeThisSession:
              id === "welcome" ? true : state.hasSeenWelcomeThisSession
          };
        }),
      focusWindow: (id) =>
        set((state) => ({
          activeWindowId: id,
          nextZIndex: state.nextZIndex + 1,
          windows: state.windows.map((window) =>
            window.id === id ? { ...window, zIndex: state.nextZIndex, isMinimized: false } : window
          )
        })),
      minimizeWindow: (id) =>
        set((state) => ({
          activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
          windows: state.windows.map((window) =>
            window.id === id ? { ...window, isMinimized: true } : window
          )
        })),
      toggleMaximizeWindow: (id) =>
        set((state) => ({
          activeWindowId: id,
          windows: state.windows.map((window) =>
            window.id === id
              ? { ...window, isMaximized: !window.isMaximized, isMinimized: false }
              : window
          )
        })),
      restoreWindow: (id) =>
        set((state) => ({
          activeWindowId: id,
          windows: state.windows.map((window) =>
            window.id === id ? { ...window, isMinimized: false } : window
          )
        })),
      moveWindow: (id, x, y) =>
        set((state) => ({
          windows: state.windows.map((window) =>
            window.id === id ? { ...window, x, y, isMaximized: false } : window
          )
        })),
      resizeWindow: (id, width, height, x, y) =>
        set((state) => ({
          windows: state.windows.map((window) =>
            window.id === id
              ? {
                  ...window,
                  width,
                  height,
                  x: x ?? window.x,
                  y: y ?? window.y,
                  isMaximized: false
                }
              : window
          )
        }))
    }),
    {
      name: "os-portfolio-desktop",
      partialize: (state) => ({
        theme: state.theme,
        windows: state.shouldShowWelcome
          ? state.windows
          : state.windows.filter((window) => window.id !== "welcome"),
        activeWindowId:
          state.shouldShowWelcome || state.activeWindowId !== "welcome"
            ? state.activeWindowId
            : null,
        nextZIndex: state.nextZIndex,
        shouldShowWelcome: state.shouldShowWelcome
      }),
      version: 2
    }
  )
);
