import type { SVGProps } from "react";
import type { WindowKind } from "../store/desktopStore";

type IconName =
  | "app"
  | "article"
  | "code"
  | "folderCode"
  | "gamepad"
  | "mail"
  | "moon"
  | "sun"
  | "user";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

const windowIconMap: Record<WindowKind, IconName> = {
  about: "user",
  blog: "article",
  blogIndex: "article",
  contact: "mail",
  game: "gamepad",
  project: "code",
  projectIndex: "folderCode"
};

export const getWindowIcon = (kind: WindowKind) => windowIconMap[kind];

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      {name === "app" ? (
        <>
          <rect x="4" y="5" width="16" height="14" rx="2.5" />
          <path d="M4 9h16" />
          <path d="M8 13h3" />
          <path d="M8 16h6" />
        </>
      ) : null}
      {name === "article" ? (
        <>
          <path d="M7 3.8h7l3 3V20a1.8 1.8 0 0 1-1.8 1.8H7A1.8 1.8 0 0 1 5.2 20V5.6A1.8 1.8 0 0 1 7 3.8Z" />
          <path d="M13.8 3.8V7h3.2" />
          <path d="M8.6 11h6.8" />
          <path d="M8.6 14.2h6.8" />
          <path d="M8.6 17.4h4.2" />
        </>
      ) : null}
      {name === "code" ? (
        <>
          <path d="m9 8-4 4 4 4" />
          <path d="m15 8 4 4-4 4" />
          <path d="m13 5-2 14" />
        </>
      ) : null}
      {name === "folderCode" ? (
        <>
          <path d="M3.8 7.2A2.2 2.2 0 0 1 6 5h4l2 2h6A2.2 2.2 0 0 1 20.2 9.2v7.6A2.2 2.2 0 0 1 18 19H6a2.2 2.2 0 0 1-2.2-2.2Z" />
          <path d="m10.4 11.1-2 1.9 2 1.9" />
          <path d="m13.6 11.1 2 1.9-2 1.9" />
        </>
      ) : null}
      {name === "gamepad" ? (
        <>
          <path d="M7.8 9.2h8.4a4.2 4.2 0 0 1 4.1 3.3l.7 3.4a2.4 2.4 0 0 1-4 2.2l-1.9-1.9H8.9L7 18.1a2.4 2.4 0 0 1-4-2.2l.7-3.4a4.2 4.2 0 0 1 4.1-3.3Z" />
          <path d="M8.2 12.1v3" />
          <path d="M6.7 13.6h3" />
          <path d="M15.9 13.1h.1" />
          <path d="M18 15h.1" />
        </>
      ) : null}
      {name === "mail" ? (
        <>
          <rect x="3.8" y="6" width="16.4" height="12" rx="2.2" />
          <path d="m5.2 8 6.8 5.2L18.8 8" />
        </>
      ) : null}
      {name === "moon" ? (
        <path d="M20.2 14.5A7.8 7.8 0 0 1 9.5 3.8 8 8 0 1 0 20.2 14.5Z" />
      ) : null}
      {name === "sun" ? (
        <>
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 2.8v2" />
          <path d="M12 19.2v2" />
          <path d="m4.9 4.9 1.4 1.4" />
          <path d="m17.7 17.7 1.4 1.4" />
          <path d="M2.8 12h2" />
          <path d="M19.2 12h2" />
          <path d="m4.9 19.1 1.4-1.4" />
          <path d="m17.7 6.3 1.4-1.4" />
        </>
      ) : null}
      {name === "user" ? (
        <>
          <circle cx="12" cy="8.2" r="3.2" />
          <path d="M5.2 20.2a6.8 6.8 0 0 1 13.6 0" />
        </>
      ) : null}
    </svg>
  );
}
