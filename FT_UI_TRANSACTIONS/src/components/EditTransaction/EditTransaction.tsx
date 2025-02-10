import React, { useEffect, useState, useCallback } from "react";
import useFetch from "container/hooks/useFetch";
import { Transaction } from "../../models/Transaction";
import { useParams } from "react-router-dom";
import { BASEURL } from "container/shared/constants";
import { FormTransaction } from "../FormTransaction/formTransaction";

export const EditTransaction: React.FC = () => {
  const { idTransaction } = useParams<{ idTransaction: string }>();

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [originalTransaction, setOriginalTransaction] =
    useState<Transaction | null>(null);

  const {
    data: dataLoading,
    error: errorLoading,
    loading,
    fetchData,
  } = useFetch("GET", `${BASEURL}transactions/${idTransaction}`);

  useEffect(() => {
    if (!transaction && !originalTransaction) {
      fetchData();
    }
  }, [fetchData, transaction, originalTransaction]);

  useEffect(() => {
    if (dataLoading && !originalTransaction) {
      setTransaction(dataLoading as Transaction);
      setOriginalTransaction(dataLoading as Transaction);
    }
  }, [dataLoading, originalTransaction]);

  const transactionHasChanges = useCallback((): boolean => {
    return JSON.stringify(transaction) !== JSON.stringify(originalTransaction);
  }, [transaction, originalTransaction]);

  const {
    data: dataUpdated,
    error: errorUpdating,
    loading: loadingUpdating,
    fetchData: updateTransaction,
  } = useFetch("PATCH", `${BASEURL}transactions/${idTransaction}`, transaction);

  useEffect(() => {
    if (transaction && transactionHasChanges()) {
      updateTransaction();
      setOriginalTransaction(transaction as Transaction);
    }
  }, [transaction, transactionHasChanges, updateTransaction]);

  if (errorLoading || !dataLoading) {
    return <h1>Transaction Not found</h1>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {transaction && (
        <FormTransaction
          onSubmit={(formData) => setTransaction(formData)}
          inputData={transaction}
        >
          <button type="submit" className="submit-btn">
            Save
          </button>
        </FormTransaction>
      )}
      {loadingUpdating && <p>Updating...</p>}
      {errorUpdating && <p>{errorUpdating}</p>}
      {dataUpdated && <p>Your transaction was updated successfully</p>}
    </>
  );
};
