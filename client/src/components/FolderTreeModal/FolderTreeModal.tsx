import { FolderIcon } from "@heroicons/react/16/solid";
import { forwardRef, memo, useCallback, useState } from "react";
import FolderTree from "../FolderTree/FolderTree";
import Button from "../ui/buttons/Button/Button";
import "./FolderTreeModal.scss";
import { useMediaQuery } from "usehooks-ts";
import IconButton from "../ui/buttons/IconButton/IconButton";
import ModalButton from "../ui/buttons/ModalButton/ModalButton";
export type FolderTreeModalProps = {
  className?: string;
};

const WINDOW_BREAKPOINT = 768;

const FolderTreeModal = forwardRef<HTMLButtonElement, FolderTreeModalProps>(
  ({ className }, ref) => {
    const [open, setOpen] = useState(false);
    const onClosePress = useCallback(() => setOpen(false), [setOpen]);
    const isDesktop = useMediaQuery(`(min-width: ${WINDOW_BREAKPOINT}px)`);
    return (
      <ModalButton
        isOpen={open}
        onOpenChange={setOpen}
        breakpoint={WINDOW_BREAKPOINT}
        buttonElement={
          <IconButton
            ref={ref}
            aria-label="Button for openning folder tree"
            className={`${className} folder-tree-model`}
            variant="secondary"
          >
            <FolderIcon className="folder-tree-model__icon" />
          </IconButton>
        }
      >
        <div className="folder-tree-model__wrapper">
          <h2 className="folder-tree-model__title">Foder tree</h2>
          <Button
            className="folder-tree-model__close-button"
            variant="accent"
            onPress={onClosePress}
          >
            Close
          </Button>
        </div>
        <FolderTree
          variant={isDesktop ? "desktop" : "mobile"}
          className="folder-tree-model__tree"
          setModalOpen={setOpen}
        />
      </ModalButton>
    );
  },
);

export default memo(FolderTreeModal);
