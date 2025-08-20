import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./utils/styles/global.scss";
import "./utils/styles/setup.scss";
import "./utils/styles/themes.scss";

import { BrowserRouter } from "react-router";
import AppRoutes from "./AppRoutes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
);
