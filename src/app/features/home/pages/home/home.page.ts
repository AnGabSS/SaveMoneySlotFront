import { Component } from '@angular/core';
import { SavedMoneyChartComponent } from '../../components/saved-money-chart/saved-money-chart.component';
import { TransactionsPerCategoryChartsComponent } from '../../components/transactions-per-category-charts.component/transactions-per-category-charts.component';

@Component({
  selector: 'app-home.page',
  imports: [SavedMoneyChartComponent, TransactionsPerCategoryChartsComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {}
