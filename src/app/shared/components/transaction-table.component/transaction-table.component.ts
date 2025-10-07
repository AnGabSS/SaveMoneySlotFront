import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { Transaction } from '../../interfaces/transaction/transaction.interface';

@Component({
  selector: 'app-transaction-table',
  imports: [TableModule, CommonModule, BadgeModule],
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss'],
})
export class TransactionTableComponent {
  @Input() transactions: Transaction[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  rowClass(transaction: Transaction) {
    return { '!bg-primary !text-primary-contrast': transaction.category.type === 'EXPENSE' };
  }

  stockSeverity(transaction: Transaction) {
    if (transaction.category.type === 'EXPENSE') return 'danger';
    else if (transaction.category.type === 'INVESTMENT') return 'warn';
    else return 'success';
  }
}
