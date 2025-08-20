import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { forwardRef, memo, useEffect, useState } from "react";
import type { Selection } from "react-aria-components";
import Checkbox from "../../ui/Checkbox/Checkbox";
import IconButton from "../../ui/IconButton/IconButton";
import type { FolderBreakpointsType, FolderOption } from "../Folder";
import "./FolderHeader.scss";

export type FolderHeaderProps = {
  className?: string;
  folderWidth: number;
  selected: Selection;
  setSelected: React.Dispatch<React.SetStateAction<Selection>>;
  options: FolderOption[];
  folderBreakpoints: FolderBreakpointsType;
};

const FolderHeader = forwardRef<HTMLDivElement, FolderHeaderProps>(
  (
    {
      className,
      folderWidth,
      selected,
      setSelected,
      options,
      folderBreakpoints,
    },
    ref,
  ) => {
    const [multipleSelected, setMultipleSelected] = useState(false);
    const handleMultipleCheckboxPressed = () => {
      if (!multipleSelected) {
        setSelected(new Set(options.map((option) => option.id)));
        return;
      }
      setSelected(new Set());
    };

    useEffect(() => {
      const selectedArray = Array.from(selected);
      if (selectedArray.length) {
        setMultipleSelected(true);
        return;
      }
      setMultipleSelected(false);
    }, [selected]);

    return (
      <div ref={ref} className={`${className} folder-header`}>
        <div className="folder-header__name">
          <Checkbox
            aria-label="Option checkbox"
            className="folder-header__checkbox"
            isSelected={multipleSelected}
            onPress={handleMultipleCheckboxPressed}
          />
          <p className="folder-header__name-title">Name</p>
        </div>
        <p
          className={`folder-header__size ${folderWidth < folderBreakpoints[1] ? "hidden" : ""}`}
        >
          Size
        </p>
        <p
          className={`folder-header__date ${folderWidth < folderBreakpoints[0] ? "hidden" : ""}`}
        >
          Date
        </p>
        <IconButton
          isDisabled={Array.from(selected).length === 0}
          variant="transparent-secondary"
          className="folder-header__more-options"
          aria-label="More options"
        >
          <EllipsisVerticalIcon />
        </IconButton>
      </div>
    );
  },
);

export default memo(FolderHeader);
