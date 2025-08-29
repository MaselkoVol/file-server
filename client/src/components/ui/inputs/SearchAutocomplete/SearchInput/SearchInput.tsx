import React, {
  forwardRef,
  memo,
  useCallback,
  type KeyboardEvent,
} from "react";
import type { SearchAutocompleteOption } from "../SearchAutocomplete";
import SearchField, {
  type SearchFieldProps,
} from "../../SearchField/SearchField";
import type { Selection } from "react-aria-components";
import "./SearchInput.scss";
import Button from "../../../buttons/Button/Button";

type SearchInputProps = {
  options: SearchAutocompleteOption[];
  isLoading?: boolean;
  value: string;
  setValue: (value: string) => void;
  listBoxRef: React.RefObject<HTMLDivElement | null>;
  setSelected: React.Dispatch<React.SetStateAction<Selection>>;
  setInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setFirstOptionSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & SearchFieldProps;

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      listBoxRef,
      setSelected,
      options,
      value,
      setValue,
      isLoading,
      setInputFocused,
      setFirstOptionSelected,
      setOpen,
      ...props
    },
    ref,
  ) => {
    const handleInputKeyboard = useCallback(
      (e: KeyboardEvent) => {
        if (!listBoxRef.current) return;
        if (e.code === "ArrowDown") {
          listBoxRef.current.focus();
        }
      },
      [listBoxRef],
    );

    const handleInputSubmit = useCallback(() => {
      if (!options.length) return;
      setSelected(new Set([options[0].id]));
      setFirstOptionSelected(true);
    }, [options]);

    const handleInputFocus = useCallback(() => {
      setInputFocused(true);
    }, [setInputFocused]);

    const handleInputBlur = useCallback(() => {
      setInputFocused(false);
    }, [setInputFocused]);

    const onClosePress = useCallback(() => setOpen(false), [setOpen]);

    return (
      <div className="search-input">
        <SearchField
          className="search-input__input"
          ref={ref}
          onSubmit={handleInputSubmit}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyboard}
          isLoading={isLoading}
          value={value}
          onChange={setValue}
          {...props}
        />
        <Button
          onPress={onClosePress}
          className="search-input__close-button"
          variant="accent"
        >
          Cancel
        </Button>
      </div>
    );
  },
);

export default memo(SearchInput);
