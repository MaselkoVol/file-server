import { forwardRef, memo } from "react";
import "./Breadcrumbs.scss";
export type BreadcrumbsProps = {
  className?: string;
};

const Breadcrumbs = forwardRef<HTMLDivElement, BreadcrumbsProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={`${className} custom`}>
        Breadcrumbs
      </div>
    );
  }
);

export default memo(Breadcrumbs);
