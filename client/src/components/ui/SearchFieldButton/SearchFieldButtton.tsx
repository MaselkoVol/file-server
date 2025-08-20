import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { forwardRef, memo } from "react";
import { Button as AriaButton, type ButtonProps } from "react-aria-components";
import Icon from "../Icon/Icon";
import "./SearchFieldButton.scss";

export type SearchFieldPropsButton = {
  variant?: "secondary" | "accent";
} & ButtonProps;

const SearchFieldButton = forwardRef<HTMLButtonElement, SearchFieldPropsButton>(
  ({ className, variant, ...props }, ref) => {
    return (
      <AriaButton
        ref={ref}
        className={`${className} search-field-button ${variant}`}
        {...props}
      >
        <Icon className="search-field-button__search-icon">
          <MagnifyingGlassIcon />
        </Icon>
        <div aria-hidden className={`search-field-button__input ${variant}`}>
          <div className="search-field-button__content"></div>
        </div>
      </AriaButton>
    );
  }
);

export default memo(SearchFieldButton);
