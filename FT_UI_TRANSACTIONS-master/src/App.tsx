import React from "react";
import StoreProvider from "container/providers/StoreProvider";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routing/routes";
import "./index.css";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

createRoot(document.getElementById("app-transactions")!).render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
