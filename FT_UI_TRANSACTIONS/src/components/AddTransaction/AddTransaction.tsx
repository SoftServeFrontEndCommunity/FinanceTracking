import React, { useEffect, useState } from "react";
import { RegisterTransaction } from "../../models/Transaction";
import useFetch from "container/hooks/useFetch";
import { BASEURL } from "container/shared/constants";
import { FormTransaction } from "../FormTransaction/formTransaction";

export const AddTransaction: React.FC = () => {
  const [transaction, setTransaction] = useState<RegisterTransaction | null>();
  const {
    data,
    error,
    loading,
    fetchData: SaveTransaction,
  } = useFetch("POST", `${BASEURL}transactions`, transaction);

  useEffect(() => {
    if (transaction) {
      SaveTransaction();
    }
    setTransaction(null);
  }, [transaction, SaveTransaction]);

  return (
    <>
      <FormTransaction
        onSubmit={(formData) => setTransaction(formData)}
        inputData={transaction}
      >
        <button type="submit" className="submit-btn">
          Save
        </button>
      </FormTransaction>
      {loading && "Creating..."}
      {error && <p>{error}</p>}
      {data && <p>Your transaction was created successfully</p>}
    </>
  );
};
