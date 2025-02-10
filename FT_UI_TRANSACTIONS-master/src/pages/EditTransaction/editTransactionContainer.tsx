import React from "react";
import "./editTransactionContainer.css";
import { EditTransaction } from "../../components/EditTransaction/editTransaction";

const EditTransactionContainer = () => {
  return (
    <>
      <div className="register-container">
        <h1 className="register-title">Edit a transaction</h1>
        <EditTransaction />
      </div>
    </>
  );
};

export default EditTransactionContainer;
