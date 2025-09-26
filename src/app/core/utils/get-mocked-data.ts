import { SavedMoneyPerMonth } from '../../shared/interfaces/report/saved-money-per-month.interface';
import { Transaction } from '../../shared/interfaces/transaction/transaction.interface';


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
