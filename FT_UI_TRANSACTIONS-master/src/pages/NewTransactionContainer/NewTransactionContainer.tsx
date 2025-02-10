import React from "react";
import { AddTransaction } from "../../components/AddTransaction/AddTransaction";
import "./NewTransactionContainer.css";

export const NewTransactionPage: React.FC = () => {
  return (
    <>
      <div className="register-container">
        <h1 className="register-title">Add a new transaction</h1>
        <AddTransaction />
      </div>
    </>
  );
};
