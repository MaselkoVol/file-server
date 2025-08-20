export const getCaseInsensitiveRegex = (str: string) => {
  const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(${escaped})`, "i");
};
