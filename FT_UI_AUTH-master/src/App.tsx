import StoreProvider from "container/providers/StoreProvider";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Routes from "./routing/routes";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

createRoot(document.getElementById("app-auth")!).render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
