import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export const { persistAtom } = recoilPersist({
  key: "recoilPersist",
  storage: localStorage,
});

export const roleState = atom<string[]>({
  key: "roleState",
  default: ["admin"],
  effects_UNSTABLE: [persistAtom],
});

export const errorState = atom<string[]>({
  key: "errorState",
  default: [],
});
