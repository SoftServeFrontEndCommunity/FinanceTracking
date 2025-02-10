import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import StoreProvider from "./providers/StoreProvider";
import routes from "./routing/routes";

export const App: React.FC = () => {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
};

createRoot(document.getElementById("app")!).render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
