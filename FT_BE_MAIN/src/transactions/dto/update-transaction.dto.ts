import { IsEnum, IsOptional } from 'class-validator';
import { TransactionCategory, typeTransaction } from '../transaction.enum';

export class UpdateTransactionDto {
  @IsOptional()
  @IsEnum(TransactionCategory)
  category: TransactionCategory;

  @IsOptional()
  value: number;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsEnum(typeTransaction)
  type: typeTransaction;
}
