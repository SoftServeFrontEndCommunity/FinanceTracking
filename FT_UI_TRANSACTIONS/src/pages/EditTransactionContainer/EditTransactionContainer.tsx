import React from "react";
import "./EditTransactionContainer.css";
import { EditTransaction } from "../../components/EditTransaction/editTransaction";

export const EditTransactionPage: React.FC = () => {
  return (
    <>
      <div className="register-container">
        <h1 className="register-title">Edit a transaction</h1>
        <EditTransaction />
      </div>
    </>
  );
};
