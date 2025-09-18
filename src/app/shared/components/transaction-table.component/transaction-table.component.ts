import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { Transaction } from '../../interfaces/transaction/transaction.interface';

@Component({
  selector: 'app-transaction-table',
  imports: [TableModule, CommonModule, BadgeModule],
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.scss',
})
export class TransactionTableComponent {
  transactions: Transaction[] = [
    {
      id: 1,
      description: 'Game Pass',
      value: 50.0,
      category: 'EXPENSE',
      createdAt: new Date(),
      user: 'David Bowie',
    },
    {
      id: 2,
      description: 'Salary',
      value: 5000.0,
      category: 'INCOME',
      createdAt: new Date(),
      user: 'David Bowie',
    },
    {
      id: 3,
      description: 'MSF14',
      value: 500.0,
      category: 'INVESTMENT',
      createdAt: new Date(),
      user: 'David Bowie',
    },
  ];

  constructor(private cd: ChangeDetectorRef) {}

  rowClass(transaction: Transaction) {
    return { '!bg-primary !text-primary-contrast': transaction.category === 'INCOME' };
  }

  stockSeverity(transaction: Transaction) {
    if (transaction.category === 'INCOME') return 'danger';
    else if (transaction.category === 'INVESTMENT') return 'warn';
    else return 'success';
  }
}
