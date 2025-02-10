import { Button } from "@pluralsight/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="header">
        <h1>Transactions</h1>
        <Button onClick={() => navigate("./new")}>+ Add Transaction</Button>
      </header>
    </>
  );
};
