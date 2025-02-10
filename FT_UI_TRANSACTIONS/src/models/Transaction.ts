export enum TransactionCategory {
  HOME = "HOME",
  TRANSPORT = "TRANSPORT",
  FOOD = "FOOD",
  FASHION = "FASHION",
  HEALTH_AND_WELLNESS = "HEALTH_AND_WELLNESS",
  ENTERTAINMENT = "ENTERTAINMENT",
  PETS = "PETS",
  TRIPS = "TRIPS",
  TECHNOLOGY = "TECHNOLOGY",
  EDUCATION = "EDUCATION",
  TAXES = "TAXES",
  INSURANCE = "INSURANCE",
  BANKING_COMMITMENTS = "BANKING_COMMITMENTS",
  BUSINESS = "BUSINESS",
  OTHERS = "OTHERS",
}

export enum TypeTransaction {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export interface Transaction {
  id: string;
  value: number;
  description: string;
  category: TransactionCategory | "";
  created_at: string;
  updated_at: string;
  type: TypeTransaction;
}

export type RegisterTransaction = Partial<
  Pick<Transaction, "category" | "description" | "value" | "type">
>;
