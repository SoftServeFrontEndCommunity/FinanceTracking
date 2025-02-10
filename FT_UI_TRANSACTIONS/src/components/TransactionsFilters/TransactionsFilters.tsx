import { Button, Flex, FormControlProvider, Input } from "@pluralsight/react";
import React, { useEffect, useState } from "react";
import { DateInput } from "../../shared/components/DateInput/DateInput";
import { DropDown } from "../../shared/components/DropDown/DropDown";
import useFetch from "container/hooks/useFetch";
import { BASEURL } from "container/shared/constants";

export type TransactionEnumResponse = {
  transactionCategories: string[];
  transactionTypes: string[];
};

export interface TransactionsFilters {
  category: string;
  created_at: string;
  type: string;
  search: string;
}

export interface TransactionsFilterProps {
  onFilter: (filters: TransactionsFilters) => void;
}

export const TransactionsFilter: React.FC<TransactionsFilterProps> = ({
  onFilter,
}) => {
  const [filters, setFilters] = useState<TransactionsFilters>({
    category: "",
    created_at: "",
    search: "",
    type: "",
  });

  const {
    data,
    error,
    loading,
    fetchData: getTransactionsEnums,
  } = useFetch<TransactionEnumResponse>("GET", `${BASEURL}transactions/enums`);

  useEffect(() => {
    getTransactionsEnums();
  }, []);

  const controlChange = (controlName: string, value: string) => {
    setFilters((prevValues) => ({ ...prevValues, [controlName]: value }));
  };

  const handleFilters = (): void => {
    onFilter(filters);
  };

  if (loading) {
    return <h1>Loading filter options...</h1>;
  }

  if (error) {
    return <h1>Error loading filter options</h1>;
  }

  return (
    <>
      <h3>Filter By</h3>
      <Flex gap={8} direction="column">
        {data && (
          <DropDown
            name="Category"
            key="transactionCategories"
            options={data.transactionCategories}
            onSelect={(event) => controlChange("category", event)}
          />
        )}
        {data && (
          <DropDown
            name="Type"
            key="transactionTypes"
            options={data.transactionTypes}
            onSelect={(event) => controlChange("type", event)}
          />
        )}
        <FormControlProvider>
          <Input
            describedBy="search:error"
            pandoSize="m"
            placeholder="Type search"
            id="search"
            name="search"
            type="text"
            value={filters.search}
            onChange={(event) => {
              controlChange("search", event.target.value);
            }}
          />
        </FormControlProvider>
        <DateInput
          name="created_at"
          onSelect={(event) => controlChange("created_at", event)}
        />
        <Button onClick={handleFilters}>Apply Filters</Button>
      </Flex>
    </>
  );
};
