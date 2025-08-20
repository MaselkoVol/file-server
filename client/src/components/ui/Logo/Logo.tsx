import { Link, type LinkProps } from "react-router";
import { forwardRef, memo } from "react";
import "./Logo.scss";

const Logo = forwardRef<HTMLAnchorElement, Omit<LinkProps, "to">>(
  ({ className, ...props }, ref) => {
    return (
      <Link
        aria-label="Logo"
        ref={ref}
        className={`${className} logo`}
        {...props}
        to={"/"}
      >
        File Server
      </Link>
    );
  },
);

export default memo(Logo);
