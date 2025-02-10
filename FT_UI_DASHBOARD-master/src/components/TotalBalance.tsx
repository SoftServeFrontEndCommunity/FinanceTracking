import React, { useMemo } from "react";
import { Flex, FlexItem } from "@pluralsight/react";

import { Transaction } from "../pages/Dashboard/Dashboard";
import { currencyFormat } from "../utils";

interface TotalBalanceProps {
  transactions: Transaction[];
}

export const TotalBalance: React.FC<TotalBalanceProps> = ({ transactions }) => {
  const { expenses, incomes } = useMemo(() => {
    return transactions.reduce(
      (acc, current) =>
        current.type === "EXPENSE"
          ? { ...acc, expenses: acc.expenses + current.value }
          : { ...acc, incomes: acc.incomes + current.value },
      { incomes: 0, expenses: 0 }
    );
  }, [transactions]);

  return (
    <Flex align="center" justify="space-evenly" direction="column">
      <FlexItem grow="1" style={{ textAlign: "center" }}>
        <h3>Total Balance: {currencyFormat(incomes - expenses)}</h3>
      </FlexItem>
      <FlexItem grow="4" style={{ width: "100%", padding: "20px 0" }}>
        <Flex align="center" justify="space-evenly" direction="row">
          <FlexItem grow="1" style={{ textAlign: "center" }}>
            <h3 style={{ textAlign: "center" }}>Expenses</h3>
            <h5>{currencyFormat(expenses)}</h5>
          </FlexItem>

          <FlexItem grow="1" style={{ textAlign: "center" }}>
            <h3 style={{ textAlign: "center" }}>Incomes</h3>
            <h5>{currencyFormat(incomes)}</h5>
          </FlexItem>
        </Flex>
      </FlexItem>
    </Flex>
  );
};
