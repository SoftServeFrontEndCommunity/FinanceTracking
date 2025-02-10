import useFetch from "container/hooks/useFetch";
import { BASEURL } from "container/shared/constants";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";

import TransactionsTable from "../../components/TransactionsTable/TransactionsTable";
import { Transaction } from "../../models/Transaction";
import "./TransactionsContainer.css";
import {
  TransactionsFilter,
  TransactionsFilters,
} from "../../components/TransactionsFilters/TransactionsFilters";

export const TransactionsContainer: React.FC = () => {
  const [idTransaction, setIdTransaction] = useState("");
  const [transactionPath, setTransactionPath] = useState("transactions");

  const { data, error, loading, fetchData } = useFetch<Transaction[]>(
    "GET",
    `${BASEURL}${transactionPath}`
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const {
    data: deleteData,
    error: deleteError,
    loading: loadingError,
    fetchData: deleteTransaction,
  } = useFetch<Transaction[]>(
    "DELETE",
    `${BASEURL}transactions/${idTransaction}`
  );

  useEffect(() => {
    if (idTransaction) {
      deleteTransaction();
    }
  }, [idTransaction]);

  useEffect(() => {
    if (deleteData) {
      fetchData();
    }
  }, [deleteData]);

  const onFilterApplied = (filters: TransactionsFilters) => {
    const queryString = Object.entries(filters)
      .filter(([_, value]) => value)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    if (queryString) {
      setTransactionPath(`transactions?${queryString}`);
    } else {
      setTransactionPath("transactions");
    }

    fetchData();
  };

  if (loading || loadingError) {
    return <h1>In progress...</h1>;
  }

  if (error || deleteError) {
    return <h1>try again later...</h1>;
  }

  return (
    <div className="transactions-container">
      <Header />
      <div className="content-area">
        <aside className="sidebar">
          <TransactionsFilter onFilter={onFilterApplied} />
        </aside>
        <main className="main-content">
          <TransactionsTable
            transactions={data}
            onDeleteTransaction={setIdTransaction}
          />
        </main>
      </div>
    </div>
  );
};
