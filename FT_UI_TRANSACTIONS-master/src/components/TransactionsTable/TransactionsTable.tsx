import { PencilIcon } from "@pluralsight/icons";
import { ConfirmProvider, Flex, Table } from "@pluralsight/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Transaction } from "../../models/Transaction";
import { DeleteComponent } from "../../shared/components/Delete/Delete";
import styles from "./TransactionsTable.module.css";

interface TransactionTableProps {
  transactions: Transaction[];
  onDeleteTransaction: (idTransaction: string) => void;
}

const TransactionsTable: React.FC<TransactionTableProps> = ({
  transactions,
  onDeleteTransaction,
}) => {
  const navigate = useNavigate();

  if (!transactions) {
    return (
      <h3>
        No transactions yet, click on "Add Transaction" button to register your
        first transaction
      </h3>
    );
  }

  const onDelete = (idTransaction: string) => {
    onDeleteTransaction(idTransaction);
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((data) => {
            return (
              <tr key={data.id}>
                <td>
                  <Flex align="center" justify="center" direction="row">
                    {new Date(data.updated_at).toLocaleDateString(undefined, {
                      dateStyle: "short",
                    })}
                  </Flex>
                </td>
                <td>
                  <Flex align="center" justify="center" direction="row">
                    {data.description}
                  </Flex>
                </td>
                <td>
                  <Flex align="center" justify="center" direction="row">
                    {data.category.replaceAll("_", " ")}
                  </Flex>
                </td>
                <td>
                  <Flex align="center" justify="center" direction="row">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(data.value)}
                  </Flex>
                </td>
                <td>
                  <Flex align="center" justify="center" direction="row">
                    {data.type}
                  </Flex>
                </td>
                <td>
                  <Flex align="center" justify="center" direction="row">
                    <PencilIcon
                      className={styles.iconCustom}
                      onClick={() => navigate(`./update/${data.id}`)}
                      aria-label="Edit Transaction"
                    />
                    <ConfirmProvider>
                      <DeleteComponent
                        heading="Delete transaction"
                        kind="destructive"
                        text="Are you sure you want to remove this transaction? This will be a permanent action."
                        onConfirm={() => onDelete(data.id)}
                      />
                    </ConfirmProvider>
                  </Flex>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TransactionsTable;
