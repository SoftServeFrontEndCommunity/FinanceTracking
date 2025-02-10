import { IsEnum, IsNotEmpty } from 'class-validator';
import { TransactionCategory, typeTransaction } from '../transaction.enum';

export class CreateTransactionDto {
  @IsEnum(TransactionCategory)
  @IsNotEmpty()
  category: TransactionCategory;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  @IsEnum(typeTransaction)
  type: typeTransaction;
}
