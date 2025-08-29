import { Cog8ToothIcon } from "@heroicons/react/16/solid";
import FolderSearch from "../FolderSearch/FolderSearch";
import FolderTree from "../FolderTree/FolderTree";
import Logo from "../ui/Logo/Logo";
import "./Sidebar.scss";
import IconButton from "../ui/buttons/IconButton/IconButton";

type Props = {
  className?: string;
};

const Sidebar = ({ className }: Props) => {
  return (
    <aside className={`${className} sidebar`}>
      <div className="sidebar__wrapper">
        <Logo className="sidebar__logo" />
        <IconButton className="sidebar__more-button">
          <Cog8ToothIcon />
        </IconButton>
      </div>
      <FolderSearch />
      <FolderTree />
    </aside>
  );
};

export default Sidebar;
