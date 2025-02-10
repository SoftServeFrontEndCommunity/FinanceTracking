import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionFilteredDto } from './dto/get-transaction-filter-dto';

@Injectable()
export class TransactionsRepository extends Repository<Transaction> {
  constructor(private dataSource: DataSource) {
    super(Transaction, dataSource.createEntityManager());
  }

  async getTransactions(filterDto: GetTransactionFilteredDto, user: User) {
    const { created_at, category, type, search, start_date, end_date } =
      filterDto;

    const query = this.createQueryBuilder('transaction');

    query.andWhere({ user });

    if (category) {
      query.andWhere('transaction.category = :category', { category });
    }

    if (type) {
      query.andWhere('transaction.type = :type', { type });
    }

    if (created_at) {
      query.andWhere('DATE(transaction.created_at) = DATE(:created_at)', {
        created_at,
      });
    }

    if (start_date && end_date) {
      query.andWhere(
        'DATE(transaction.created_at) BETWEEN :start_date AND :end_date',
        {
          start_date: new Date(start_date),
          end_date: new Date(end_date),
        },
      );
    }

    if (search) {
      query.andWhere('(LOWER(transaction.description) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }

    const transactions = await query.getMany();

    return transactions;
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
    user: User,
  ): Promise<Transaction> {
    const { category, value, description, type } = createTransactionDto;
    const transaction = this.create({
      value,
      description,
      category,
      type,
      user: user,
    });

    await this.save(transaction);
    return transaction;
  }
}
