import {
  CloudArrowDownIcon,
  DocumentTextIcon,
  EllipsisVerticalIcon,
  FolderIcon,
  InformationCircleIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import prettyBytes from "pretty-bytes";
import { forwardRef, memo } from "react";
import { GridListItem, type GridListItemProps } from "react-aria-components";
import { useTranslation } from "react-i18next";
import { FOLDER_BREAKPOINTS } from "../../../shared/constants";
import IconButton from "../../ui/buttons/IconButton/IconButton";
import { type MenuItem } from "../../ui/buttons/MenuButton/MenuButton";
import Icon from "../../ui/Icon/Icon";
import Checkbox from "../../ui/inputs/Checkbox/Checkbox";
import type { ModifiedFolderOption } from "../FolderGrid/FolderGrid";
import MenuButton from "../../ui/buttons/MenuButton/MenuButton";
import "./FolderItem.scss";

export type FolderItemProps = {
  className?: string;
  item: ModifiedFolderOption;
} & GridListItemProps;

const getMenuOptions = (item: ModifiedFolderOption) => {
  const menu: MenuItem[] = [];

  menu.push({
    name: `${item.isFolder ? "Folder" : "File"} information`,
    iconStart: <InformationCircleIcon />,
    onSelect: () => console.log("name"),
  });

  menu.push({
    name: `Delete ${item.isFolder ? "folder" : "file"}`,
    iconStart: <TrashIcon />,
    onSelect: () => console.log("name"),
  });

  if (!item.isFolder) {
    menu.push({
      name: "Download file",
      iconStart: <CloudArrowDownIcon />,
      onSelect: () => console.log("name"),
    });
  }

  return menu;
};

const FolderItem = forwardRef<HTMLDivElement, FolderItemProps>(
  ({ className, item, ...props }, ref) => {
    const { i18n } = useTranslation("folder");
    return (
      <GridListItem ref={ref} className={`${className} folder-item`} {...props}>
        {({ isSelected }) => (
          <>
            <div className="folder-item__name">
              <Icon className="folder-item__icon">
                {item.isFolder ? <FolderIcon /> : <DocumentTextIcon />}
              </Icon>
              {item.isFolder || item.name.indexOf(".") < 1 ? (
                <span className="folder-item__name-text">{item.name}</span>
              ) : (
                <>
                  <span className="folder-item__name-text">
                    {item.name.split(".").slice(0, -1).join(".")}
                  </span>
                  <span className="folder-item__name-ext">
                    {"." + item.name.split(".").slice(-1)[0]}
                  </span>
                </>
              )}
            </div>
            <p
              className={`folder-item__size ${item.folderWidth < FOLDER_BREAKPOINTS[1] ? "hidden" : ""}`}
            >
              {prettyBytes(item.size)}
            </p>
            <p
              className={`folder-item__date ${item.folderWidth < FOLDER_BREAKPOINTS[0] ? "hidden" : ""}`}
            >
              {item.date.toLocaleString(i18n.language, {
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
                className="folder-item__checkbox"
              />
            ) : (
              <MenuButton
                placement="bottom end"
                buttonElement={
                  <IconButton
                    variant="transparent-secondary"
                    className="folder-item__more-options"
                    aria-label="Info"
                  >
                    <EllipsisVerticalIcon />
                  </IconButton>
                }
                items={getMenuOptions(item)}
              />
            )}
          </>
        )}
      </GridListItem>
    );
  },
);

export default memo(FolderItem);
