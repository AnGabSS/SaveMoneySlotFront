import { TransactionType } from "../../../enums/transaction/transaction-type.enum";

export interface CreateTransactionCategoryInterface {
  name: string;
  type: TransactionType;
}
