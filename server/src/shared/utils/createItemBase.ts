import { ItemBaseType, ItemType } from "../types";

export function createItemBase(pathname: string): ItemBaseType {
  const pathnameParts = pathname.split("/");
  const path = pathnameParts.slice(0, -1).join("/");
  const name = pathnameParts.slice(-1).join("/");
  return {
    name: name,
    path: path,
  };
}
