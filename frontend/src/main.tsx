import CustomLayout from "@/components/Layout";
import { store } from "@/features/store";
import { ROUTES } from "@/router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginCard from "./components/LoginCard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { registerAllModules } from "handsontable/registry";

import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";

registerAllModules();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CustomLayout>
          <Routes>
            <Route path="/login" element={<LoginCard />} />
            <Route element={<ProtectedRoute />}>
              {ROUTES.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Route>
          </Routes>
        </CustomLayout>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
