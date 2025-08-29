import { useQuery } from "@tanstack/react-query";
import {
  forwardRef,
  memo,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { type Selection } from "react-aria-components";
import { useLocation } from "react-router";
import { useResizeObserver } from "usehooks-ts";
import { getFolderContent } from "../../api/folders";
import { getRelativePathname } from "../../shared/utils/pathname";
import Spinner from "../ui/Spinner/Spinner";
import FolderBreadcrumbs from "./FolderBreadcrumbs/FolderBreadcrumbs";
import FolderError from "./FolderError/FolderError";
import FolderGrid from "./FolderGrid/FolderGrid";
import FolderHeader from "./FolderHeader/FolderHeader";

import "./Folder.scss";
export type FolderOption = {
  pathname: string;
  isFolder: boolean;
  size: number;
  date: Date;
};

export type FolderProps = {
  className?: string;
};

const Folder = forwardRef<HTMLDivElement, FolderProps>(({ className }, ref) => {
  const location = useLocation();

  const relativePathname = useMemo(() => {
    return getRelativePathname(decodeURIComponent(location.pathname));
  }, [location.pathname]);
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ["folders", location.pathname],
    queryFn: () => getFolderContent({ pathname: relativePathname }),
  });

  const [selected, setSelected] = useState<Selection>(new Set());

  const options = useMemo(() => {
    if (!data) return [];

    const folders: FolderOption[] = data.folders.map((folder) => ({
      pathname: folder.pathname,
      isFolder: true,
      size: folder.size,
      date: new Date(folder.date),
    }));
    const files: FolderOption[] = data.files.map((file) => ({
      pathname: file.pathname,
      isFolder: false,
      size: file.size,
      date: new Date(file.date),
    }));
    setSelected(new Set([]));
    return [...folders, ...files];
  }, [data]);

  const folderRef = useRef<HTMLDivElement>(null);
  const { width: folderWidth } = useResizeObserver({
    ref: folderRef as RefObject<HTMLElement>,
  });

  return (
    <div className="folder">
      {relativePathname && <FolderBreadcrumbs pathname={relativePathname} />}
      <div ref={ref} className={`${className} folder__wrapper`}>
        <div ref={folderRef} className="folder__content">
          {folderWidth && (
            <>
              <FolderHeader
                folderWidth={folderWidth}
                options={options}
                selected={selected}
                setSelected={setSelected}
              />
              {isLoading ? (
                <div className="folder__loader">
                  <Spinner className="folder__loader-icon" />
                </div>
              ) : isError ? (
                <FolderError
                  refetch={refetch}
                  isHome={relativePathname === ""}
                  errorCode={error.message}
                />
              ) : (
                <FolderGrid
                  folderWidth={folderWidth}
                  options={options}
                  selected={selected}
                  setSelected={setSelected}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default memo(Folder);
