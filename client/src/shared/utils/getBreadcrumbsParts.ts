import { getAbsolutePathname } from "./pathname";

type BreadcrumbsItem = {
  name: string;
  pathname: string;
};

const getPathnameHome = (name: string): BreadcrumbsItem => {
  return {
    name: name,
    pathname: getAbsolutePathname(""),
  };
};

const getPathnameItem = (pathnamePart: string, absolutePathname: string) => {
  const partIndex = absolutePathname.indexOf(pathnamePart);
  if (partIndex < 1) return getPathnameHome(pathnamePart);
  const partEndIndex = partIndex + pathnamePart.length;
  const pathnameToPart = absolutePathname.slice(0, partEndIndex);
  return {
    name: pathnamePart,
    pathname: pathnameToPart,
  };
};

export const getBreadcurmbsParts = (pathname: string) => {
  if (!pathname) {
    return [getPathnameHome("..")];
  }

  const absolutePathname = getAbsolutePathname(pathname);

  const pathnameParts: BreadcrumbsItem[] = pathname
    .split("/")
    .map((pathnamePart) => getPathnameItem(pathnamePart, absolutePathname));

  const filteredParts = pathnameParts.slice(-2);
  filteredParts.unshift(getPathnameHome(".."));
  return filteredParts;
};
