import { forwardRef, memo } from "react";
import { GridListItem, type GridListItemProps } from "react-aria-components";
import Icon from "../../ui/Icon/Icon";
import Checkbox from "../../ui/Checkbox/Checkbox";
import IconButton from "../../ui/IconButton/IconButton";
import {
  DocumentTextIcon,
  EllipsisVerticalIcon,
  FolderIcon,
} from "@heroicons/react/16/solid";
import prettyBytes from "pretty-bytes";
import type { modifiedFolderOption } from "../FolderGrid/FolderGrid";
import { FOLDER_BREAKPOINTS } from "../../../shared/constants";
import "./FolderItem.scss";
import { useTranslation } from "react-i18next";

export type FolderItemProps = {
  className?: string;
  item: modifiedFolderOption;
} & GridListItemProps;

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
              {typeof item.size === "number" ? prettyBytes(item.size) : "-"}
            </p>
            <p
              className={`folder-item__date ${item.folderWidth < FOLDER_BREAKPOINTS[0] ? "hidden" : ""}`}
            >
              {item.date
                ? item.date.toLocaleString(i18n.language, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "-"}
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
              <IconButton
                variant="transparent-secondary"
                className="folder-item__more-options"
                aria-label="Info"
                onPress={() => console.log(`Info for ${item.pathname}...`)}
              >
                <EllipsisVerticalIcon />
              </IconButton>
            )}
          </>
        )}
      </GridListItem>
    );
  },
);

export default memo(FolderItem);
