import { forwardRef, memo, type HTMLAttributes } from "react";
import "./Skeleton.scss";
export type SkeletonProps = {
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={`${className} skeleton`} {...props}></div>;
  },
);

export default memo(Skeleton);
