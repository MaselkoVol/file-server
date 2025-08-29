import { forwardRef, memo } from "react";
import type { LinkButtonProps } from "../LinkButton/LinkButton";
import LinkButton from "../LinkButton/LinkButton";
import "./IconLinkButton.scss";

export type IconLinkButtonProps = {} & LinkButtonProps;

const IconLinkButton = forwardRef<HTMLAnchorElement, IconLinkButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <LinkButton
        ref={ref}
        className={`${className} icon-link-button`}
        {...props}
      >
        {children}
      </LinkButton>
    );
  },
);

export default memo(IconLinkButton);
