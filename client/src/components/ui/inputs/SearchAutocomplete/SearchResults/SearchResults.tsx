import {
  FolderIcon,
  MagnifyingGlassIcon,
  NoSymbolIcon,
} from "@heroicons/react/16/solid";
import { forwardRef, memo, useMemo } from "react";
import { ListBox, ListBoxItem, type Selection } from "react-aria-components";
import type { SearchAutocompleteOption } from "../SearchAutocomplete";
import "./SearchResults.scss";
import { getCaseInsensitiveRegex } from "../../../../../shared/utils/getCaseInsensitiveRegex";
import Icon from "../../../Icon/Icon";

type SearchResultsProps = {
  value: string;
  options: SearchAutocompleteOption[];
  isLoading?: boolean;
  selected: Selection;
  setSelected: React.Dispatch<React.SetStateAction<Selection>>;
  inputFocused: boolean;
  firstOptionSelected: boolean;
};

const selectMatch = (name: string, value: string) => {
  if (!value) return <span>{name}</span>;

  const regex = getCaseInsensitiveRegex(value);
  const parts = name.split(regex);
  return parts.map((part, idx) =>
    regex.test(part) ? (
      <span key={idx} className="search-results__matched-text">
        {part}
      </span>
    ) : (
      <span key={idx}>{part}</span>
    ),
  );
};

const SearchResults = forwardRef<HTMLDivElement, SearchResultsProps>(
  (
    {
      value,
      options,
      isLoading,
      selected,
      setSelected,
      inputFocused,
      firstOptionSelected,
    },
    ref,
  ) => {
    const modifiedOptions = useMemo(() => {
      return options.map((options, idx) => ({
        ...options,
        highlight: value,
        fistFocused: inputFocused && idx === 0,
        fistSelected: firstOptionSelected && idx === 0,
      }));
    }, [options, inputFocused, selected]);

    const listBox = useMemo(
      () => (
        <ListBox
          className="search-results__list"
          ref={ref}
          aria-label="Search results"
          selectionMode="single"
          shouldFocusWrap
          selectedKeys={selected}
          onSelectionChange={setSelected}
          items={modifiedOptions}
        >
          {(item) => (
            <ListBoxItem
              textValue={item.name}
              className={`search-results__option ${
                item.fistFocused ? "first-focused" : ""
              }
                 ${item.fistSelected ? "first-selected" : ""}
              }`}
            >
              <Icon className="search-results__folder-icon">
                <FolderIcon />
              </Icon>
              {selectMatch(item.name, item.highlight)}
            </ListBoxItem>
          )}
        </ListBox>
      ),
      [modifiedOptions, selected, ref],
    );

    if (value === "") {
      return (
        <div className="search-results__message-wrapper">
          <Icon className="search-results__message-icon">
            <MagnifyingGlassIcon />
          </Icon>
          <p className="search-results__message">
            Search results will be displayed here.
          </p>
        </div>
      );
    }

    if (modifiedOptions.length || isLoading) {
      return listBox;
    }

    return (
      <div className="search-results__message-wrapper">
        <Icon className="search-results__message-icon">
          <NoSymbolIcon />
        </Icon>
        <p className="search-results__message">No results for "{value}"</p>
      </div>
    );
  },
);

export default memo(SearchResults);
