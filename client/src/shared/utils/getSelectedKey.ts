import type { Selection } from "react-aria-components";

export const getSelectedKey = (selected: Selection) => {
  const keys = Array.from(selected);
  if (!keys.length) return null;

  const key = keys[0];
  return key;
};
