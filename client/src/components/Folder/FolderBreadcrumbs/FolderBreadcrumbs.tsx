import { forwardRef, memo } from "react";
import { getAbsolutePathname } from "../../../shared/utils/pathname";
import { Link } from "react-router";
import Button from "../../ui/Button/Button";

import "./FolderBreadcrumbs.scss";
import IconButton from "../../ui/IconButton/IconButton";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";

export type FolderBreadcrumbsProps = {
  className?: string;
  pathname: string;
};

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

const getBreadcurmbsParts = (pathname: string) => {
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

const FolderBreadcrumbs = forwardRef<HTMLDivElement, FolderBreadcrumbsProps>(
  ({ className, pathname }, ref) => {
    const breadcrumbsParts = getBreadcurmbsParts(pathname);
    return (
      <div ref={ref} className={`${className} breadcrumbs`}>
        {breadcrumbsParts.map((part, idx) => (
          <>
            <span key={idx} className="breadcrumbs__separator">
              /
            </span>
            <Link
              key={part.pathname}
              className="breadcrumbs__link"
              to={part.pathname}
            >
              {part.name}
            </Link>
          </>
        ))}
      </div>
    );
  },
);

export default memo(FolderBreadcrumbs);
