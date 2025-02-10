import React from "react";
import { Route, Routes } from "react-router-dom";
import { DashboardPage } from "../pages/Dashboard/Dashboard";

const routes = () => (
  <Routes>
    <Route path="/" element={<DashboardPage />} />
  </Routes>
);

export default routes;
