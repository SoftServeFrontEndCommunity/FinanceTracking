import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { TransactionCategory, typeTransaction } from '../transaction.enum';

export class GetTransactionFilteredDto {
  @IsOptional()
  @IsEnum(TransactionCategory)
  category?: TransactionCategory;

  @IsOptional()
  @IsDateString()
  created_at?: string; // Creation date

  @IsOptional()
  type?: typeTransaction;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;
}
