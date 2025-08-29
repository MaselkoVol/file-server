import { forwardRef, memo } from "react";
import { Link, type LinkProps } from "react-router";
import type { ButtonVariant } from "../Button/Button";

import "./LinkButton.scss";

export type LinkButtonProps = {
  className?: string;
  variant?: ButtonVariant;
} & LinkProps;

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant = "secondary", children, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        className={`${className} link-button ${variant}`}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

export default memo(LinkButton);
