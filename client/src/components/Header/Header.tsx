import { Cog8ToothIcon } from "@heroicons/react/16/solid";
import { forwardRef, memo } from "react";
import FolderSearch from "../FolderSearch/FolderSearch";
import FolderTreeModal from "../FolderTreeModal/FolderTreeModal";
import Logo from "../ui/Logo/Logo";
import "./Header.scss";
import IconButton from "../ui/buttons/IconButton/IconButton";
export type HeaderProps = {
  className?: string;
};

const Header = forwardRef<HTMLElement, HeaderProps>(({ className }, ref) => {
  return (
    <header ref={ref} className={`${className} header`}>
      <Logo className="header__logo" />
      <div className="header__wrapper">
        <FolderSearch className="header__folder-search" />
        <FolderTreeModal className="header__folder-tree-modal" />
        <IconButton className="header__more-button">
          <Cog8ToothIcon />
        </IconButton>
      </div>
    </header>
  );
});

export default memo(Header);
