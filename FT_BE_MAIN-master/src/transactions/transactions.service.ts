import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Transaction } from './transaction.entity';
import { TransactionsRepository } from './transactions.repository';
import { TransactionCategory, typeTransaction } from './transaction.enum';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionFilteredDto } from './dto/get-transaction-filter-dto';
import { EnumsResponseDto } from 'src/tasks/dto/transaction-enums.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsRepository)
    private transactionsRepository: TransactionsRepository,
  ) {}

  async getTransaction(
    filterDto: GetTransactionFilteredDto,
    user: User,
  ): Promise<Transaction[]> {
    return this.transactionsRepository.getTransactions(filterDto, user);
  }

  async getTransactionTypes(): Promise<EnumsResponseDto> {
    const transactionCategories = Object.values(TransactionCategory);
    const transactionTypes = Object.values(typeTransaction);

    return {
      transactionCategories,
      transactionTypes,
    };
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
    user: User,
  ): Promise<Transaction> {
    return this.transactionsRepository.createTransaction(
      createTransactionDto,
      user,
    );
  }

  async getTransactionById(id: string): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOneBy({
      id,
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with Id ${id} not found.`);
    }
    return transaction;
  }

  async deleteTransaction(id: string, user: User): Promise<object> {
    const result = await this.transactionsRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Transaction with Id ${id} not found.`);
    }

    if(result.affected === 1){
      return { message: `Transaction with Id ${id} successfully deleted.` }
    }
  }

  async updateTransaction(
    id: string,
    category: TransactionCategory,
    value: number,
    description: string,
    type: typeTransaction,
  ): Promise<Transaction> {
    const transaction = await this.getTransactionById(id);

    transaction.category = category ? category : transaction.category;
    transaction.value = value ? value : transaction.value;
    transaction.description = description
      ? description
      : transaction.description;
    transaction.type = type ? type : transaction.type;

    await this.transactionsRepository.save(transaction);

    return transaction;
  }
}
