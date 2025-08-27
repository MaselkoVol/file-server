import { Navigate, Route, Routes as Routes } from "react-router";
import MainPage from "./MainPage/MainPage";
import config from "../config";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={`/${config.uploadsFolderName}`} replace />}
      />
      <Route path={`/${config.uploadsFolderName}/*`} element={<MainPage />} />
    </Routes>
  );
};

export default AppRoutes;
