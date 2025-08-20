import {
  DocumentTextIcon,
  EllipsisVerticalIcon,
  FolderIcon,
} from "@heroicons/react/16/solid";
import { forwardRef, memo, useCallback, useMemo } from "react";
import {
  GridList,
  GridListItem,
  type Key,
  type Selection,
} from "react-aria-components";
import { useMediaQuery } from "usehooks-ts";
import Checkbox from "../../ui/Checkbox/Checkbox";
import IconButton from "../../ui/IconButton/IconButton";
import type { FolderBreakpointsType, FolderOption } from "../Folder";
import "./FolderGrid.scss";
import Icon from "../../ui/Icon/Icon";
export type FolderGridProps = {
  className?: string;
  folderWidth: number;
  selected: Selection;
  setSelected: React.Dispatch<React.SetStateAction<Selection>>;
  options: FolderOption[];
  folderBreakpoints: FolderBreakpointsType;
  onChoose: (option: FolderOption) => void;
};

const FolderGrid = forwardRef<HTMLDivElement, FolderGridProps>(
  (
    {
      className,
      folderWidth,
      selected,
      setSelected,
      options,
      folderBreakpoints,
      onChoose,
    },
    ref,
  ) => {
    const handleGridAction = useCallback(
      (key: Key) => {
        const option = options.find((option) => option.id === key);
        if (!option) return;

        alert("salamaleikum");
        onChoose(option);
      },
      [options],
    );

    const canHover = useMediaQuery("(hover: hover)");

    const modifiedOptions = useMemo(() => {
      return options.map((option) => ({
        ...option,
        folderWidth: folderWidth,
      }));
    }, [options, folderWidth]);

    return (
      <GridList
        ref={ref}
        className={`${className} folder-grid`}
        aria-label="Folder items"
        selectionMode="multiple"
        selectionBehavior={canHover ? "replace" : "toggle"}
        onAction={handleGridAction}
        selectedKeys={selected}
        onSelectionChange={setSelected}
        items={modifiedOptions}
      >
        {(item) => (
          <GridListItem className="folder-grid__item" textValue={item.name}>
            {({ isSelected }) => (
              <>
                <div className="folder-grid__name">
                  <Icon className="folder-grid__icon">
                    {item.type === "file" ? (
                      <DocumentTextIcon />
                    ) : (
                      <FolderIcon />
                    )}
                  </Icon>
                  {item.type === "file" ? (
                    <>
                      <span className="folder-grid__name-text">
                        {item.name.split(".").slice(0, -1).join(".")}
                      </span>
                      <span className="folder-grid__name-ext">
                        {"." + item.name.split(".").slice(-1)[0]}
                      </span>
                    </>
                  ) : (
                    <span className="folder-grid__name-text">{item.name}</span>
                  )}
                </div>
                <p
                  className={`folder-grid__size ${item.folderWidth < folderBreakpoints[1] ? "hidden" : ""}`}
                >
                  {item.size}
                </p>
                <p
                  className={`folder-grid__date ${item.folderWidth < folderBreakpoints[0] ? "hidden" : ""}`}
                >
                  {item.createdAt.toLocaleString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                {isSelected ? (
                  <Checkbox
                    aria-label="Is selected"
                    isDisabled
                    variant="accent"
                    slot="selection"
                    className="folder-grid__checkbox"
                  />
                ) : (
                  <IconButton
                    variant="transparent-secondary"
                    className="folder-grid__more-options"
                    aria-label="Info"
                    onPress={() => console.log(`Info for ${item.name}...`)}
                  >
                    <EllipsisVerticalIcon />
                  </IconButton>
                )}
              </>
            )}
          </GridListItem>
        )}
      </GridList>
    );
  },
);

export default memo(FolderGrid);
