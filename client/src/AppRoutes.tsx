import { Route, Routes as Routes } from "react-router";
import MainPage from "./pages/MainPage/MainPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};

export default AppRoutes;
