import { ChevronRightIcon, FolderIcon } from "@heroicons/react/16/solid";
import { forwardRef, memo, useEffect, useState } from "react";
import {
  Collection,
  Tree,
  TreeItem,
  TreeItemContent,
  type Selection,
} from "react-aria-components";
import Icon from "../ui/Icon/Icon";
import IconButton from "../ui/IconButton/IconButton";
import "./FolderTree.scss";
import { items } from "./mock";
import { getSelectedKey } from "../../utils/functions/getSelectedKey";

export type FolderTreeOption = {
  id: number;
  name: string;
  children: FolderTreeOption[];
};

export type FolderTreeProps = {
  className?: string;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  variant?: "mobile" | "desktop";
};

const FolderTree = forwardRef<HTMLDivElement, FolderTreeProps>(
  ({ className, setModalOpen, variant = "desktop" }, ref) => {
    const [selected, setSelected] = useState<Selection>(new Set());
    const [options] = useState<FolderTreeOption[]>(items);

    const onChoose = (option: FolderTreeOption) => {
      console.log(option.name);
    };
    useEffect(() => {
      const key = getSelectedKey(selected);
      if (!key) return;

      const optionsQueue = [...options];
      while (optionsQueue.length) {
        const currentOption = optionsQueue.shift();
        if (!currentOption) break;
        if (currentOption.id !== key) {
          optionsQueue.push(...currentOption.children);
          continue;
        }

        if (setModalOpen) {
          setModalOpen(false);
        }
        onChoose(currentOption);
        break;
      }
    }, [selected]);

    return (
      <Tree
        ref={ref}
        aria-label="Files"
        items={options}
        selectedKeys={selected}
        onSelectionChange={setSelected}
        selectionMode="single"
        autoFocus
        className={`${className} folder-tree ${variant}`}
      >
        {function renderItem(item) {
          return (
            <TreeItem className={"folder-tree__item"} textValue={item.name}>
              <TreeItemContent>
                {({ hasChildItems }) => (
                  <div className="folder-tree__item-content">
                    {hasChildItems && (
                      <IconButton
                        variant="transparent-secondary"
                        aria-label="Expand button"
                        slot="chevron"
                        className="folder-tree__expand-button"
                      >
                        <ChevronRightIcon aria-hidden />
                      </IconButton>
                    )}
                    <Icon className="folder-tree__folder-icon">
                      <FolderIcon />
                    </Icon>
                    <span slot="selection">{item.name}</span>
                  </div>
                )}
              </TreeItemContent>
              <Collection items={item.children}>{renderItem}</Collection>
            </TreeItem>
          );
        }}
      </Tree>
    );
  },
);

export default memo(FolderTree);
