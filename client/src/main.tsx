import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./shared/i18n";

import "./shared/utils/styles/global.scss";
import "./shared/utils/styles/setup.scss";
import "./shared/utils/styles/themes.scss";

import { BrowserRouter } from "react-router";
import AppRoutes from "./pages/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
