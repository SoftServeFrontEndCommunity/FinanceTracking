import React from "react";
import { Route, Routes } from "react-router-dom";

import { EditTransactionPage } from "../pages/EditTransactionContainer/EditTransactionContainer";
import { NewTransactionPage } from "../pages/NewTransactionContainer/NewTransactionContainer";
import { TransactionsContainer } from "../pages/TransactionsContainer/TransactionsContainer";

const routes = () => (
  <Routes>
    <Route path="/" element={<TransactionsContainer />} />
    <Route path="/new" element={<NewTransactionPage />} />
    <Route path="/update/:idTransaction" element={<EditTransactionPage />} />
    <Route path="/update/*" element={<h1>Transaction not found</h1>} />
  </Routes>
);

export default routes;
