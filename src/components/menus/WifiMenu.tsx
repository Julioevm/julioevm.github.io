import React from "react";
import "react-rangeslider/lib/index.css";

interface WifiMenuProps {
  toggleWifiMenu: () => void;
  btnRef: React.RefObject<HTMLDivElement>;
}

export default function WifiMenu({ toggleWifiMenu, btnRef }: WifiMenuProps) {
  const wifiRef = useRef<HTMLDivElement>(null);
  const { wifi, toggleWIFI } = useStore((state) => ({
    wifi: state.wifi,
    toggleWIFI: state.toggleWIFI
  }));

  useClickOutside(wifiRef, toggleWifiMenu, [btnRef]);

  return (
    <div
      className="right-0 h-11 max-w-full w-80 hstack justify-between px-2 py-0.5 menu-box sm:right-2"
      ref={wifiRef}
    >
      <div className="px-2.5 font-medium">Wi-Fi</div>
      <div className="px-2.5">
        <label className="switch-toggle">
          <input type="checkbox" checked={wifi} onChange={toggleWIFI} />
          <span className="slider-toggle" />
        </label>
      </div>
    </div>
  );
}
