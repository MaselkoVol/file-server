import { forwardRef, memo } from "react";
import Button, { type ButtonProps } from "../Button/Button";
import "./IconButton.scss";

export type IconButtonProps = {} & ButtonProps;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button ref={ref} {...props} className={`${className} icon-button`}>
        {children}
      </Button>
    );
  },
);

export default memo(IconButton);
