import { forwardRef, memo, type JSX } from "react";
import {
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  type PopoverProps,
} from "react-aria-components";
import Icon from "../../Icon/Icon";

import "./MenuButton.scss";

export type MenuItem = {
  name: string;
  iconStart?: JSX.Element;
  iconEnd?: JSX.Element;
  onSelect: () => void;
};

export type PopoverButtonProps = {
  className?: string;
  buttonElement: JSX.Element;
  items: MenuItem[];
} & PopoverProps;

const MenuButton = forwardRef<HTMLDivElement, PopoverButtonProps>(
  ({ className, buttonElement, items, ...props }, ref) => {
    return (
      <MenuTrigger>
        {buttonElement}
        <Popover {...props} className={`${className} context-button`} ref={ref}>
          <Menu
            className={`${className} context-button__menu`}
            ref={ref}
            autoFocus
            shouldFocusWrap
            selectionMode="single"
            items={items}
          >
            {(item) => (
              <MenuItem
                onAction={item.onSelect}
                textValue={item.name}
                id={item.name}
                className="context-button__item"
              >
                {item.iconStart && (
                  <Icon className="context-button__icon context-button__icon-start">
                    {item.iconStart}
                  </Icon>
                )}
                {item.name}
                {item.iconEnd && (
                  <Icon className="context-button__icon context-button__icon-end">
                    {item.iconEnd}
                  </Icon>
                )}
              </MenuItem>
            )}
          </Menu>
        </Popover>
      </MenuTrigger>
    );
  },
);

export default memo(MenuButton);
