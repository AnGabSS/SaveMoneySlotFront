import { SavedMoneyPerMonth } from '../../shared/interfaces/report/saved-money-per-month.interface';

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
