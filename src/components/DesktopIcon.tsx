import type { WindowSeed } from "../store/desktopStore";
import { Icon, getWindowIcon } from "./Icon";

type DesktopIconProps = {
  item: WindowSeed;
  onOpen: () => void;
};

export function DesktopIcon({ item, onOpen }: DesktopIconProps) {
  return (
    <button className="desktop-icon" type="button" onClick={onOpen} onDoubleClick={onOpen}>
      <span className="desktop-icon__glyph" aria-hidden="true">
        <Icon name={getWindowIcon(item.kind)} />
      </span>
      <span className="desktop-icon__label">{item.title}</span>
    </button>
  );
}
