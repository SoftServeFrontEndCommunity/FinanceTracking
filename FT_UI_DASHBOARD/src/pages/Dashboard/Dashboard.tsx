import { Flex, FlexItem } from "@pluralsight/react";
import React, { Fragment, useEffect, useMemo, useState } from "react";

import useFetch from "container/hooks/useFetch";
import { selectUser, useStoreSelector } from "container/hooks/useStoreSelector";
import { BASEURL } from "container/shared/constants";
import { DateRange, DateSelector } from "../../components/Selector";
import { SpendingOverview } from "../../components/SpendingOverview";
import { Statistics } from "../../components/Statistics";
import { TotalBalance } from "../../components/TotalBalance";

export interface Transaction {
  id: string;
  value: number;
  description: string;
  category: string; // Adjust based on possible types
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  type: string; // Adjust based on possible types
  trxDate: Date;
}

const daysFormula = (days: number) => days * 24 * 60 * 60 * 1000;

const calculateDateRange = (now: Date, range: DateRange) => {
  return {
    endDate: now.toISOString(),
    startDate: new Date(
      now.getTime() -
        daysFormula(
          range === DateRange.LAST_MONT
            ? 30
            : range === DateRange.LAST_QUARTER
            ? 90
            : range === DateRange.LAST_SEMESTER
            ? 180
            : 360
        )
    ).toISOString(),
  };
};

export const DashboardPage: React.FC = () => {
  const { username } = useStoreSelector(selectUser);
  const currentDate = new Date();
  const [range, setRange] = useState(DateRange.LAST_MONT);
  const dateRange = useMemo(
    () => calculateDateRange(currentDate, range),
    [range]
  );

  const {
    data: dataTransactions,
    error: errorTransactions,
    loading: loadingTransactions,
    fetchData: fetchTransactions,
  } = useFetch<Transaction[]>(
    "GET",
    `${BASEURL}transactions?start_date=${dateRange.startDate}&end_date=${dateRange.endDate}`
  );

  const {
    data: dataEnums,
    error: errorEnums,
    loading: loadingEnums,
    fetchData: fetchEnums,
  } = useFetch<{ transactionTypes: string[]; transactionCategories: string[] }>(
    "GET",
    `${BASEURL}transactions/enums`
  );

  const transactions = useMemo(() => {
    if (dataTransactions) {
      return dataTransactions.map((transaction) => {
        return {
          ...transaction,
          trxDate: new Date(transaction.created_at),
        };
      });
    }
    return [];
  }, [dataTransactions]);

  const categories = useMemo(
    () => (dataEnums ? dataEnums.transactionCategories : []),
    [dataEnums]
  );

  useEffect(() => {
    fetchEnums();
  }, [fetchEnums]);

  useEffect(() => {
    fetchTransactions();
  }, [dateRange, fetchTransactions]);

  const handleDateChange = (range: DateRange) => {
    setRange(range);
  };

  return (
    <Flex align="center" justify="space-evenly" direction="column">
      {errorEnums || errorTransactions ? (
        <h1>There was an error getting the transactions, please try again</h1>
      ) : (
        <Fragment>
          {loadingEnums || loadingTransactions ? (
            <h1>Loading...</h1>
          ) : (
            <Fragment>
              <FlexItem grow="1" style={{ textAlign: "center" }}>
                <h1 style={{ textTransform: "capitalize" }}>
                  {username} Balance
                </h1>
              </FlexItem>
              <FlexItem grow="1" style={{ textAlign: "center" }}>
                <DateSelector range={range} handleChange={handleDateChange} />
              </FlexItem>
              <Flex align="center" justify="space-evenly" direction="row">
                <FlexItem grow="1" style={{ textAlign: "center" }}>
                  <TotalBalance transactions={transactions} />
                </FlexItem>
                <FlexItem grow="1" style={{ textAlign: "center" }}>
                  <Statistics range={range} transactions={transactions} />
                </FlexItem>
              </Flex>
              <FlexItem grow="1" style={{ width: "100%", padding: "20px 0" }}>
                <SpendingOverview
                  categories={categories}
                  transactions={transactions.filter(
                    (trx) => trx.type === "EXPENSE"
                  )}
                />
              </FlexItem>
            </Fragment>
          )}
        </Fragment>
      )}
    </Flex>
  );
};
