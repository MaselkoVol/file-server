import { forwardRef, memo } from "react";
import Button, { type ButtonProps } from "../Button/Button";
export type IconButtonProps = {} & ButtonProps;
import "./IconButton.scss";

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        type="button"
        ref={ref}
        {...props}
        className={`${className} icon-button`}
      >
        {children}
      </Button>
    );
  },
);

export default memo(IconButton);
