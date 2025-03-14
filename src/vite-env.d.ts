/// <reference types="vite/client" />

import type { AttributifyAttributes } from "unocss/dist/preset-attributify";

declare module "react" {
  /* eslint-disable-next-line */
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}
