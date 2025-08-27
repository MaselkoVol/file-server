import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { forwardRef, memo, useEffect, useState } from "react";
import type { Selection } from "react-aria-components";
import Checkbox from "../../ui/Checkbox/Checkbox";
import IconButton from "../../ui/IconButton/IconButton";
import type { FolderOption } from "../Folder";
import "./FolderHeader.scss";
import { FOLDER_BREAKPOINTS } from "../../../shared/constants";
import { useTranslation } from "react-i18next";

export type FolderHeaderProps = {
  className?: string;
  folderWidth: number;
  selected: Selection;
  setSelected: React.Dispatch<React.SetStateAction<Selection>>;
  options: FolderOption[];
};

const FolderHeader = forwardRef<HTMLDivElement, FolderHeaderProps>(
  ({ className, folderWidth, selected, setSelected, options }, ref) => {
    const { t } = useTranslation("folder");
    const [multipleSelected, setMultipleSelected] = useState(false);
    const handleMultipleCheckboxPressed = () => {
      if (!multipleSelected) {
        setSelected(new Set(options.map((option) => option.pathname)));
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
          <p className="folder-header__name-title">{t("NAME")}</p>
        </div>
        <p
          className={`folder-header__size ${folderWidth < FOLDER_BREAKPOINTS[1] ? "hidden" : ""}`}
        >
          {t("SIZE")}
        </p>
        <p
          className={`folder-header__date ${folderWidth < FOLDER_BREAKPOINTS[0] ? "hidden" : ""}`}
        >
          {t("DATE")}
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
