import { SavedMoneyPerMonth } from '../../shared/interfaces/report/saved-money-per-month.interface';
import { Transaction } from '../../shared/interfaces/transaction/transaction.interface';

export const savedMoneyMocked: SavedMoneyPerMonth[] = [
  { month: 'January', amountSaved: 200 },
  { month: 'February', amountSaved: 450 },
  { month: 'March', amountSaved: 10000 },
  { month: 'April', amountSaved: 600 },
  { month: 'May', amountSaved: 500 },
  { month: 'June', amountSaved: 700 },
];

export const expensesAmountPerCategoryMocked = [
  { category: 'Food', totalAmount: 1200 },
  { category: 'Transport', totalAmount: 300 },
  { category: 'Entertainment', totalAmount: 450 },
  { category: 'Utilities', totalAmount: 600 },
  { category: 'Health', totalAmount: 200 },
];

export const transactionsMocked = (numberOfTransactions: number): Transaction[] => {
  const transactions = [];
  for (let i = 1; i <= numberOfTransactions; i++) {
    transactions.push({
      id: i,
      description: `Transaction ${i}`,
      value: parseFloat((Math.random() * 1000).toFixed(2)),
      category: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Health'][
        Math.floor(Math.random() * 5)
      ],
      createdAt: new Date(),
      user: 'Ezio Auditore da Firenze',
    });
  }
  return transactions;
};
