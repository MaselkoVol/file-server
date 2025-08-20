import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import SearchAutocomplete, {
  type SearchAutocompleteOption,
} from "../ui/SearchAutocomplete/SearchAutocomplete";
import { mockOptions } from "./mock";
import { getCaseInsensitiveRegex } from "../../utils/functions/getCaseInsensitiveRegex";
import "./FolderSearch.scss";

export type FolderSearchProps = {
  className?: string;
};

const FolderSearch = forwardRef<HTMLInputElement, FolderSearchProps>(
  ({ className }, ref) => {
    const [searchValue, setSearchValue] = useState("");
    const options = useMemo(() => mockOptions, []);
    const [currentOptions, setCurrentOptions] = useState(options);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setIsLoading(true);
      if (searchValue.length < 1) {
        setCurrentOptions([]);
        setIsLoading(false);
        return;
      }
      const timeout = setTimeout(() => {
        const currentSearchValue = searchValue;
        const regex = getCaseInsensitiveRegex(currentSearchValue);

        const matched = options.filter((option) => regex.test(option.name));

        matched.sort((option1, option2) => {
          const diff1 = option1.name.length - currentSearchValue.length;
          const diff2 = option2.name.length - currentSearchValue.length;
          if (diff1 > diff2) return 1;
          if (diff1 === diff2) return 0;
          return -1;
        });
        setCurrentOptions(matched.slice(0, 20));
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timeout);
    }, [searchValue, options]);

    const alertValue = useCallback(
      (option: SearchAutocompleteOption) => console.log(option.name),
      []
    );

    return (
      <SearchAutocomplete
        className={`${className} folder-search`}
        ref={ref}
        label="good mornign"
        hiddenLabel
        value={searchValue}
        setValue={setSearchValue}
        options={currentOptions}
        isLoading={isLoading}
        onChoose={alertValue}
      >
        FolderSearch
      </SearchAutocomplete>
    );
  }
);

export default memo(FolderSearch);
