import { forwardRef, memo, type JSX } from "react";
import {
  Dialog,
  DialogTrigger,
  type DialogTriggerProps,
} from "react-aria-components";
import { useMediaQuery } from "usehooks-ts";
import Modal from "../../Modal/Modal";

import "./ModalButton.scss";

export type ModalButtonProps = {
  className?: string;
  buttonElement: JSX.Element;
  breakpoint?: number;
} & DialogTriggerProps;

const ModalButton = forwardRef<HTMLDivElement, ModalButtonProps>(
  ({ buttonElement, breakpoint = 768, children, className, ...props }, ref) => {
    const matches = useMediaQuery(
      `(min-width: ${breakpoint}px) and (min-height: 576px)`,
    );
    return (
      <DialogTrigger {...props}>
        {buttonElement}
        <Modal
          ref={ref}
          overlayClassName={`button-modal ${matches ? "desktop" : "mobile"}`}
          className={`${className} button-modal__modal`}
          isDismissable
        >
          <Dialog className="button-modal__dialog">{children}</Dialog>
        </Modal>
      </DialogTrigger>
    );
  },
);

export default memo(ModalButton);
