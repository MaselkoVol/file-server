import { forwardRef, memo, useRef, useState, type RefObject } from "react";
import { type Selection } from "react-aria-components";
import { useResizeObserver } from "usehooks-ts";
import "./Folder.scss";
import FolderGrid from "./FolderGrid/FolderGrid";
import FolderHeader from "./FolderHeader/FolderHeader";
import { rows } from "./mock";

export type FolderOption = {
  id: number;
  name: string;
  type: "file" | "folder";
  size: number;
  createdAt: Date;
};

export type FolderBreakpointsType = [number, number];
const FOLDER_BREAKPOINTS: FolderBreakpointsType = [580, 400];

export type FolderProps = {
  className?: string;
};

const Folder = forwardRef<HTMLDivElement, FolderProps>(({ className }, ref) => {
  const [options] = useState<FolderOption[]>(rows);
  const [selected, setSelected] = useState<Selection>(new Set());

  const fileRef = useRef<HTMLDivElement>(null);
  const { width: folderWidth } = useResizeObserver({
    ref: fileRef as RefObject<HTMLElement>,
  });

  return (
    <div ref={ref} className={`${className} folder`}>
      <div ref={fileRef} className="folder__wrapper">
        {folderWidth && (
          <>
            <FolderHeader
              folderWidth={folderWidth}
              options={options}
              selected={selected}
              setSelected={setSelected}
              folderBreakpoints={FOLDER_BREAKPOINTS}
            />
            <FolderGrid
              onChoose={() => {}}
              folderWidth={folderWidth}
              options={options}
              selected={selected}
              setSelected={setSelected}
              folderBreakpoints={FOLDER_BREAKPOINTS}
            />
          </>
        )}
      </div>
    </div>
  );
});

export default memo(Folder);
