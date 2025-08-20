import { forwardRef, memo } from "react";
import "./Spinner.scss";
export type SpinnerProps = {
  className?: string;
};

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div aria-hidden ref={ref} className={`${className} spinner`} {...props}>
        <svg className="spinner__svg" viewBox="0 0 24 24">
          <g className="spinner__content">
            <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3" />
          </g>
        </svg>
      </div>
    );
  }
);

export default memo(Spinner);
