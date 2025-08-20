import { forwardRef, memo } from "react";
import {
  TextField as AriaTextField,
  Input,
  FieldError,
  Label,
  Text,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from "react-aria-components";

import "./TextField.scss";

export type TextFieldProps = {
  variant?: "secondary" | "accent";
  label: string;
  hiddenLabel?: boolean;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
} & AriaTextFieldProps;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      label,
      hiddenLabel,
      description,
      errorMessage,
      variant = "secondary",
      ...props
    },
    ref,
  ) => {
    return (
      <AriaTextField
        className={`${className} text-field ${variant}`}
        {...props}
      >
        <Label
          className={`text-field__label 
            ${hiddenLabel ? "visually-hidden" : ""}`}
        >
          {label}
        </Label>
        <Input ref={ref} className="text-field__input" />
        {description && (
          <Text className="text-field__description" slot="description">
            {description}
          </Text>
        )}
        <FieldError className="text-field__error">{errorMessage}</FieldError>
      </AriaTextField>
    );
  },
);

export default memo(TextField);
