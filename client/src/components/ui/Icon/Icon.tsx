import { forwardRef, memo, type HTMLAttributes } from "react";
import "./Icon.scss";

const Icon = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div aria-hidden ref={ref} className={`${className} icon`} {...props}>
        {children}
      </div>
    );
  }
);

export default memo(Icon);
