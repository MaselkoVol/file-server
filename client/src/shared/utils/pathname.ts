import config from "../../config";

export const getRelativePathname = (absolutePathname: string) => {
  const relativePathnameParts = absolutePathname.split("/").slice(2);
  return relativePathnameParts.join("/");
};

export const getAbsolutePathname = (relativePathname: string) => {
  const pathnameToHome = "/" + config.uploadsFolderName;
  if (!relativePathname) return pathnameToHome;
  return pathnameToHome + "/" + relativePathname;
};
