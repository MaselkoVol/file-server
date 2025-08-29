import { forwardRef, memo, type JSX } from "react";
import { ListBox, ListBoxItem, type ListBoxProps } from "react-aria-components";
import Icon from "../Icon/Icon";

import "./List.scss";

export type ListItemType = {
  name: string;
  iconStart?: JSX.Element;
  iconEnd?: JSX.Element;
};

export type ListProps = {} & ListBoxProps<ListItemType>;

const List = forwardRef<HTMLDivElement, ListProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <ListBox
        selectionMode="single"
        shouldFocusWrap
        autoFocus
        items={items}
        ref={ref}
        className={`${className} list`}
        {...props}
      >
        {(item) => (
          <ListBoxItem
            textValue={item.name}
            id={item.name}
            className="list__item"
          >
            {item.iconStart && (
              <Icon className="list__icon list__icon-start">
                {item.iconStart}
              </Icon>
            )}
            {item.name}
            {item.iconEnd && (
              <Icon className="list__icon list__icon-end">{item.iconEnd}</Icon>
            )}
          </ListBoxItem>
        )}
      </ListBox>
    );
  },
);

export default memo(List);
