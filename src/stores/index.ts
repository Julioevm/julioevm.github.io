import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { createDockSlice, type DockSlice } from "./slices/dock";
import { createSystemSlice, type SystemSlice } from "./slices/system";
import { createUserSlice, type UserSlice } from "./slices/user";

export type StoreSlice = DockSlice & SystemSlice & UserSlice;
export const useStore = createWithEqualityFn<StoreSlice>(
  (...a) => ({
    ...createDockSlice(...a),
    ...createSystemSlice(...a),
    ...createUserSlice(...a),
  }),
  shallow
);
