import React, { useMemo } from "react";
import { Flex, FlexItem } from "@pluralsight/react";

import { LineChart } from "./LineChart";
import { Transaction } from "../pages/Dashboard/Dashboard";
import { DateRange } from "./Selector";

interface StatisticsProps {
  range: DateRange;
  transactions: Transaction[];
}

export const Statistics: React.FC<StatisticsProps> = ({
  range,
  transactions,
}) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const { groupedX, income, expense } = useMemo(() => {
    const groupedX =
      range === DateRange.LAST_MONT
        ? [...Array(30).keys()].map((i) => i + 1).reverse()
        : calculateMonthsAgo(
            DateRange.LAST_QUARTER === range
              ? 3
              : DateRange.LAST_SEMESTER === range
              ? 6
              : 12
          ).reverse();

    const incomes = transactions.filter((trx) => trx.type === "INCOME");
    const expenses = transactions.filter((trx) => trx.type === "EXPENSE");
    const { income, expense } = groupedX.reduce(
      (acc, x) => {
        const incomeValue = incomes
          .filter((trx) => {
            return range === DateRange.LAST_MONT
              ? trx.trxDate.getDate() === x
              : trx.trxDate.getMonth() === x;
          })
          .reduce((acc, trx) => acc + trx.value, 0);

        const expenseValue = expenses
          .filter((trx) => {
            return range === DateRange.LAST_MONT
              ? trx.trxDate.getDate() === x
              : trx.trxDate.getMonth() === x;
          })
          .reduce((acc, trx) => acc + trx.value, 0);

        return {
          income: [...acc.income, incomeValue],
          expense: [...acc.expense, expenseValue],
        };
      },
      { income: [] as number[], expense: [] as number[] }
    );

    return { groupedX, income, expense };
  }, [transactions]);

  return (
    <Flex align="center" justify="space-evenly" direction="column">
      <FlexItem grow="1" style={{ textAlign: "center" }}>
        <h3>Income vs Expenses</h3>
      </FlexItem>
      <FlexItem grow="1" style={{ textAlign: "center" }}>
        <LineChart
          incomeData={income}
          expenseData={expense}
          months={
            range === DateRange.LAST_MONT
              ? groupedX.map((m) => m.toString())
              : groupedX.map((m) => monthNames[m])
          }
        />
      </FlexItem>
    </Flex>
  );
};

const calculateMonthsAgo = (monthsAgo: number) => {
  // Get the current date
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const now = new Date();

  // Calculate the month indexes
  const currentMonthIndex = now.getMonth();
  const sixMonthsAgoIndex = (currentMonthIndex - (monthsAgo - 1) + 12) % 12; // Adjust for wrap-around

  // Create an array with months from 6 months ago to now (inclusive)
  const result = [];
  for (let i = 0; i < monthsAgo; i++) {
    // Include the current month, so loop for 6 items
    result.push(months[(sixMonthsAgoIndex + i) % 12]);
  }

  return result;
};
