import { forwardRef, memo } from "react";
import "./Modal.scss";
import {
  Modal as AriaModal,
  ModalOverlay,
  type ModalOverlayProps as AriaModalProps,
} from "react-aria-components";

export type ModalProps = {
  overlayClassName?: string;
} & AriaModalProps;

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className, overlayClassName, children, ...props }, ref) => {
    return (
      <ModalOverlay className={`${overlayClassName} modal`} {...props}>
        <AriaModal ref={ref} className={`${className} modal__content`}>
          {children}
        </AriaModal>
      </ModalOverlay>
    );
  }
);

export default memo(Modal);
