import type { WindowSeed } from "../store/desktopStore";

type DesktopIconProps = {
  item: WindowSeed;
  onOpen: () => void;
};

const iconMap: Record<WindowSeed["kind"], string> = {
  about: "ID",
  blog: "MD",
  blogIndex: "TXT",
  contact: "@",
  project: "GH",
  projectIndex: "{}"
};

export function DesktopIcon({ item, onOpen }: DesktopIconProps) {
  return (
    <button className="desktop-icon" type="button" onClick={onOpen} onDoubleClick={onOpen}>
      <span className="desktop-icon__glyph" aria-hidden="true">
        {iconMap[item.kind]}
      </span>
      <span className="desktop-icon__label">{item.title}</span>
    </button>
  );
}
