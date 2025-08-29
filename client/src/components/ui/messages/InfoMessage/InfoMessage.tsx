import { forwardRef, memo } from "react";
import "./InfoMessage.scss";
export type InfoMessageProps = {
  className?: string;
};

const InfoMessage = forwardRef<HTMLDivElement, InfoMessageProps>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={`${className} custom`}>
        InfoMessage
      </div>
    );
  },
);

export default memo(InfoMessage);
