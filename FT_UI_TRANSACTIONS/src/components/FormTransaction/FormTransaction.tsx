import React, { useState, useEffect } from "react";
import {
  RegisterTransaction,
  Transaction,
  TransactionCategory,
  TypeTransaction,
} from "../../models/Transaction";

type TransactionForm = Transaction | RegisterTransaction | null;

interface FormTransactionProps {
  onSubmit: (data: any) => void;
  inputData?: TransactionForm;
  children?: any;
}

export const FormTransaction: React.FC<FormTransactionProps> = ({
  onSubmit,
  inputData,
  children,
}) => {
  const getDefaultFormData = (data?: TransactionForm): TransactionForm => ({
    ...inputData,
    category: data?.category || "",
    description: data?.description || "",
    value: data?.value || 0,
    type: data?.type || TypeTransaction.EXPENSE,
  });

  const [formData, setFormData] = useState<TransactionForm>(
    getDefaultFormData(inputData)
  );

  useEffect(() => {
    setFormData(getDefaultFormData(inputData));
  }, [inputData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <form className="transaction-form" onSubmit={handleSubmit}>
        <label>
          Category:
          <select
            name="category"
            value={formData?.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {Object.values(TransactionCategory).map((category) => (
              <option key={category} value={category}>
                {category.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </label>

        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData?.description}
            onChange={handleChange}
            placeholder="Enter a description of your transaction"
            required
          />
        </label>

        <label>
          Value:
          <input
            type="number"
            name="value"
            value={formData?.value}
            onChange={handleChange}
            required
          />
        </label>

        <div className="transaction-type-toggle">
          <label
            className={
              formData?.type === TypeTransaction.INCOME ? "active" : ""
            }
          >
            <input
              type="radio"
              name="type"
              value={TypeTransaction.INCOME}
              checked={formData?.type === TypeTransaction.INCOME}
              onChange={handleChange}
            />
            Income
          </label>
          <label
            className={
              formData?.type === TypeTransaction.EXPENSE ? "active" : ""
            }
          >
            <input
              type="radio"
              name="type"
              value={TypeTransaction.EXPENSE}
              checked={formData?.type === TypeTransaction.EXPENSE}
              onChange={handleChange}
            />
            Expense
          </label>
        </div>

        {children}
      </form>
    </>
  );
};
