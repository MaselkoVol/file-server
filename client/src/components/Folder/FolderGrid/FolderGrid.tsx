import { forwardRef, memo, useCallback, useMemo } from "react";
import { GridList, type Key, type Selection } from "react-aria-components";
import { useNavigate } from "react-router";
import { useMediaQuery } from "usehooks-ts";
import { createItemBase } from "../../../shared/utils/createItemBase";
import type { FolderOption } from "../Folder";
import FolderItem from "../FolderItem/FolderItem";
import "./FolderGrid.scss";
import { getAbsolutePathname } from "../../../shared/utils/pathname";

export type FolderGridProps = {
  className?: string;
  folderWidth: number;
  selected: Selection;
  setSelected: React.Dispatch<React.SetStateAction<Selection>>;
  options: FolderOption[];
};

export type ModifiedFolderOption = FolderOption & {
  path: string;
  name: string;
  folderWidth: number;
};

const FolderGrid = forwardRef<HTMLDivElement, FolderGridProps>(
  ({ className, folderWidth, selected, setSelected, options }, ref) => {
    const navigate = useNavigate();

    const handleGridAction = useCallback(
      (pathname: Key) => {
        const option = options.find((option) => option.pathname === pathname);
        if (!option || !option.isFolder) return;
        navigate(getAbsolutePathname(pathname.toString()));
      },
      [navigate, options],
    );
    const canHover = useMediaQuery("(hover: hover)");

    const modifiedOptions: ModifiedFolderOption[] = useMemo(() => {
      return options.map((option) => {
        const itemBase = createItemBase(option.pathname);
        return {
          ...option,
          path: itemBase.path,
          name: itemBase.name,
          folderWidth: folderWidth,
        };
      });
    }, [options, folderWidth]);

    return (
      <GridList
        ref={ref}
        className={`${className} folder-grid`}
        autoFocus
        aria-label="Folder items"
        selectionMode="multiple"
        selectionBehavior={canHover ? "replace" : "toggle"}
        onAction={handleGridAction}
        selectedKeys={selected}
        onSelectionChange={setSelected}
        items={modifiedOptions}
      >
        {(item) => (
          <FolderItem
            id={item.pathname}
            textValue={item.pathname}
            item={item}
          />
        )}
      </GridList>
    );
  },
);

export default memo(FolderGrid);
