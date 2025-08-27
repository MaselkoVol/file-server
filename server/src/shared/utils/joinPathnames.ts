export function joinPathnames(pathname1: string, pathname2: string) {
  if (!pathname1) {
    return pathname2;
  }
  if (!pathname2) {
    return pathname1;
  }
  return pathname1 + "/" + pathname2;
}
