import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";
export type WindowKind =
  | "blog"
  | "blogIndex"
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
  setTheme: (theme: Theme) => void;
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

export const useDesktopStore = create<DesktopState>()(
  persist(
    (set, get) => ({
      theme: "system",
      windows: [],
      activeWindowId: null,
      nextZIndex: 10,
      setTheme: (theme) => set({ theme }),
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
          const windows = state.windows.filter((window) => window.id !== id);
          const activeWindowId =
            state.activeWindowId === id
              ? windows.reduce<DesktopWindow | null>(
                  (topWindow, window) =>
                    topWindow && topWindow.zIndex > window.zIndex ? topWindow : window,
                  null
                )?.id ?? null
              : state.activeWindowId;
          return { windows, activeWindowId };
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
      version: 2
    }
  )
);
