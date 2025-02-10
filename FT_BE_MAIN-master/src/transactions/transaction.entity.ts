import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';
import { TransactionCategory, typeTransaction } from './transaction.enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: number;

  @Column()
  description: string;

  @Column()
  category: TransactionCategory;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @Column()
  type: typeTransaction;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => User, (user) => user.task, { eager: false })
  @Exclude({ toPlainOnly: true }) // because we don't want to show user data
  user: User;
}
