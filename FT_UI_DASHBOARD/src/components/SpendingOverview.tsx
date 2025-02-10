import React, { useMemo } from "react";
import { Flex, FlexItem } from "@pluralsight/react";

import { BarChart } from "./BarChart";
import { Transaction } from "../pages/Dashboard/Dashboard";

interface SpendingOverviewProps {
  categories: string[];
  transactions: Transaction[];
}

export const SpendingOverview: React.FC<SpendingOverviewProps> = ({
  categories,
  transactions,
}) => {
  const accPerCategories = useMemo(() => {
    return categories.reduce((acc, category) => {
      const total = transactions.reduce((accTrx, transaction) => {
        if (transaction.category === category) {
          return accTrx + transaction.value;
        }
        return accTrx;
      }, 0);

      return [...acc, total];
    }, [] as number[]);
  }, [categories, transactions]);

  const expenseData = {
    labels: [...categories],
    datasets: [
      {
        label: "Aggregated Expense By Category",
        data: accPerCategories,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Flex align="center" justify="space-evenly" direction="column">
      <Flex align="center" justify="space-evenly" direction="row">
        <FlexItem grow="1" style={{ textAlign: "center" }}>
          <h3>Spending Overview</h3>
        </FlexItem>
      </Flex>
      <FlexItem grow="1" style={{ width: "100%", padding: "20px 0" }}>
        <FlexItem grow="1" style={{ textAlign: "center" }}>
          <BarChart chartData={expenseData} chartTitle="" />
        </FlexItem>
      </FlexItem>
    </Flex>
  );
};
