import { Exclude } from 'class-transformer';
import { Task } from 'src/tasks/task.entity';
import { Transaction } from 'src/transactions/transaction.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  username: string;
  @Column()
  @Exclude()
  password: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Task, (task) => task.user, { eager: true })
  @Exclude()
  task: Task[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Transaction, (task) => task.user, { eager: true })
  @Exclude()
  transaction: Transaction[];
}
