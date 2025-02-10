import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Transaction } from './transaction.entity';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionFilteredDto } from './dto/get-transaction-filter-dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { EnumsResponseDto } from 'src/tasks/dto/transaction-enums.dto';

@Controller('transactions')
@UseGuards(AuthGuard())
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  getTransaction(
    @Query() filterDto: GetTransactionFilteredDto,
    @GetUser() user: User,
  ): Promise<Transaction[]> {
    return this.transactionsService.getTransaction(filterDto, user);
  }

  @Get('enums')
  getTransactionTypes(): Promise<EnumsResponseDto> {
    return this.transactionsService.getTransactionTypes();
  }

  @Post()
  createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
    @GetUser() user: User,
  ): Promise<Transaction> {
    return this.transactionsService.createTransaction(
      createTransactionDto,
      user,
    );
  }

  @Get('/:id')
  getTransactionById(@Param('id') id: string): Promise<Transaction> {
    return this.transactionsService.getTransactionById(id);
  }

  @Delete('/:id')
  deleteTransaction(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<object> {
    return this.transactionsService.deleteTransaction(id, user);
  }

  @Patch('/:id')
  updateTransaction(
    @Param('id') id: string,
    @Body() updateTransactionStatusDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const { category, value, description, type } = updateTransactionStatusDto;

    return this.transactionsService.updateTransaction(
      id,
      category,
      value,
      description,
      type,
    );
  }
}
