import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { forwardRef, memo } from "react";
import {
  SearchField as AriaSearchField,
  FieldError,
  Input,
  Label,
  Text,
  type SearchFieldProps as AriaSearchFieldProps,
  type ValidationResult,
} from "react-aria-components";
import Icon from "../Icon/Icon";
import IconButton from "../IconButton/IconButton";
import Spinner from "../Spinner/Spinner";
import "./SearchField.scss";

export type SearchFieldProps = {
  variant?: "secondary" | "accent";
  label: string;
  hiddenLabel?: boolean;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  isLoading?: boolean;
} & AriaSearchFieldProps;

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      className,
      label,
      hiddenLabel,
      description,
      errorMessage,
      isLoading,
      variant = "secondary",
      ...props
    },
    ref,
  ) => {
    return (
      <AriaSearchField
        className={`${className} search-field ${variant}`}
        {...props}
      >
        <Label
          className={`text-field__label
            ${hiddenLabel ? "visually-hidden" : ""}`}
        >
          {label}
        </Label>
        <div className="search-field__input-wrapper">
          {isLoading ? (
            <Spinner className="search-field__spinner" />
          ) : (
            <Icon className="search-field__search-icon">
              <MagnifyingGlassIcon />
            </Icon>
          )}
          <Input type="search" ref={ref} className="search-field__input" />
          <IconButton
            aria-label="Clear button"
            className="search-field__clear-button"
            variant={`transparent-${variant}`}
          >
            <XMarkIcon aria-hidden />
          </IconButton>
        </div>
        {description && (
          <Text className="search-field__description" slot="description">
            {description}
          </Text>
        )}
        <FieldError className="search-field__error">{errorMessage}</FieldError>
      </AriaSearchField>
    );
  },
);

export default memo(SearchField);
