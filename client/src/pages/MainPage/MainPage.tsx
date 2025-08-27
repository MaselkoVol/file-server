import { memo } from "react";
import Folder from "../../components/Folder/Folder";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <div className="wrapper">
      <Sidebar className="wrapper__sidebar" />
      <Header className="wrapper__header" />
      <main className="main">
        <div className="main__wrapper">
          <Folder className="wrapper__folder" />
        </div>
      </main>
    </div>
  );
};

export default memo(MainPage);
