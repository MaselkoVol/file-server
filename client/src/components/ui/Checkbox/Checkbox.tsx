import { forwardRef, memo } from "react";
import "./Checkbox.scss";
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
} from "react-aria-components";
import Icon from "../Icon/Icon";
export type CheckboxProps = {
  className?: string;
  variant?: "secondary" | "accent";
} & AriaCheckboxProps;

const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  ({ className, variant = "secondary", ...props }, ref) => {
    return (
      <AriaCheckbox
        ref={ref}
        className={`${className} checkbox ${variant}`}
        {...props}
      >
        <Icon className="checkbox__icon">
          <svg strokeWidth={5} className="checkbox__svg" viewBox="0 0 24 24">
            <polyline
              strokeLinecap="round"
              strokeLinejoin="round"
              points="3 14 10 21 21 3"
            ></polyline>
          </svg>
        </Icon>
      </AriaCheckbox>
    );
  },
);

export default memo(Checkbox);
