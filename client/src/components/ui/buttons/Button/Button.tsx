import { forwardRef, memo } from "react";
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";
import "./Button.scss";

export type ButtonVariant =
  | "secondary"
  | "accent"
  | "transparent-secondary"
  | "transparent-accent";

export type ButtonProps = {
  variant?: ButtonVariant;
} & AriaButtonProps;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "secondary", children, ...props }, ref) => {
    return (
      <AriaButton
        ref={ref}
        className={`${className} button ${variant}`}
        {...props}
      >
        {children}
      </AriaButton>
    );
  },
);

export default memo(Button);
