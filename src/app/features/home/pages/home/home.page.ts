import { Component } from '@angular/core';
import { SavedMoneyChartComponent } from '../../components/saved-money-chart/saved-money-chart.component';
import { TransactionsPerCategoryChartsComponent } from '../../components/transactions-per-category-charts.component/transactions-per-category-charts.component';
import { TransactionTableComponent } from '../../../../shared/components/transaction-table.component/transaction-table.component';
import { Transaction } from '../../../../shared/interfaces/transaction/transaction.interface';
import { TransactionService } from '../../../../core/services/transactions/transaction.service';

@Component({
  selector: 'app-home.page',
  imports: [
    SavedMoneyChartComponent,
    TransactionsPerCategoryChartsComponent,
    TransactionTableComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  constructor(private transactionService: TransactionService) {}
  transactionsData: Transaction[] = [];
  ngOnInit() {
    this.transactionService.getTransactions('1', '5').subscribe((value) => {
      this.transactionsData = value.content;
    });
  }
}
