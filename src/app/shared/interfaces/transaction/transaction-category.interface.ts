import { TransactionType } from '../../enums/transaction/transaction-type.enum';

export interface TransactionCategory {
  id: number;
  name: string;
  type: TransactionType;
  userURL: string;
}
