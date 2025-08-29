import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { type Selection } from "react-aria-components";
import { type SearchFieldProps } from "../SearchField/SearchField";
import "./SearchAutocomplete.scss";
import SearchInput from "./SearchInput/SearchInput";
import SearchResults from "./SearchResults/SearchResults";
import { getSelectedKey } from "../../../../shared/utils/getSelectedKey";
import ModalButton from "../../buttons/ModalButton/ModalButton";
import SearchFieldButtton from "../../buttons/SearchFieldButton/SearchFieldButtton";

export type SearchAutocompleteOption = {
  id: number;
  name: string;
};

type SearchAutocompleteProps = {
  options: SearchAutocompleteOption[];
  onChoose?: (option: SearchAutocompleteOption) => void;
  isLoading?: boolean;
  value: string;
  setValue: (value: string) => void;
} & SearchFieldProps;

const SearchAutocomplete = forwardRef<
  HTMLInputElement,
  SearchAutocompleteProps
>(
  (
    { className, onChoose, value, setValue, options, isLoading, ...props },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const listBoxRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Selection>(new Set());
    const [inputFocused, setInputFocused] = useState(true);
    const [firstOptionSelected, setFirstOptionSelected] = useState(false);

    useEffect(() => {
      if (!inputRef.current) return;
      if (open) {
        inputRef.current.focus();
        setFirstOptionSelected(false);
        setSelected(new Set());
        setValue("");
      }
    }, [open]);

    useEffect(() => {
      if (!onChoose) return;

      const key = getSelectedKey(selected);
      const option = options.find((option) => option.id === key);
      if (!option) return;

      setOpen(false);
      onChoose(option);
    }, [selected]);

    return (
      <ModalButton
        isOpen={open}
        onOpenChange={setOpen}
        breakpoint={1024}
        buttonElement={
          <SearchFieldButtton
            aria-label="Open folders search button"
            className={`${className} search-autocomplete`}
            variant="secondary"
          />
        }
      >
        <SearchInput
          ref={inputRef}
          hiddenLabel
          options={options}
          isLoading={isLoading}
          value={value}
          setValue={setValue}
          listBoxRef={listBoxRef}
          setSelected={setSelected}
          setInputFocused={setInputFocused}
          setFirstOptionSelected={setFirstOptionSelected}
          setOpen={setOpen}
          {...props}
        />
        <SearchResults
          ref={listBoxRef}
          value={value}
          inputFocused={inputFocused}
          firstOptionSelected={firstOptionSelected}
          options={options}
          selected={selected}
          setSelected={setSelected}
          isLoading={isLoading}
        />
      </ModalButton>
    );
  },
);

export default memo(SearchAutocomplete);
