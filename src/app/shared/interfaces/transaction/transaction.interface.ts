import { TransactionCategory } from './category/transaction-category.interface';

export interface Transaction {
  id: number;
  description: string;
  value: number;
  category: TransactionCategory;
  createdAt: Date;
  user: String;
}
