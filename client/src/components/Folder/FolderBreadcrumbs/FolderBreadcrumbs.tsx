import React, { forwardRef, memo } from "react";

import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { getBreadcurmbsParts } from "../../../shared/utils/getBreadcrumbsParts";
import IconLinkButton from "../../ui/buttons/IconLinkButton/IconLinkButton";
import LinkButton from "../../ui/buttons/LinkButton/LinkButton";

import "./FolderBreadcrumbs.scss";

export type FolderBreadcrumbsProps = {
  className?: string;
  pathname: string;
};

const FolderBreadcrumbs = forwardRef<HTMLDivElement, FolderBreadcrumbsProps>(
  ({ className, pathname }, ref) => {
    const breadcrumbsParts = getBreadcurmbsParts(pathname);
    return (
      <div ref={ref} className={`${className} breadcrumbs`}>
        {breadcrumbsParts.map((part, idx) => (
          <React.Fragment key={idx}>
            <span className="breadcrumbs__separator">/</span>
            {part.name === ".." ? (
              <IconLinkButton
                variant="transparent-secondary"
                to={part.pathname}
                className="breadcrumbs__icon-link"
              >
                <EllipsisHorizontalIcon />
              </IconLinkButton>
            ) : (
              <LinkButton
                variant="transparent-secondary"
                className="breadcrumbs__link"
                to={part.pathname}
              >
                {part.name}
              </LinkButton>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  },
);

export default memo(FolderBreadcrumbs);
