import { TransactionType } from "../../enums/transaction/transaction-type.enum";
import { TransactionCountPerCategory } from "./transaction-count-per-category.interface";

export interface TransactionCountPerType{
    type: TransactionType;
    transactionsQuantity: TransactionCountPerCategory[];
}