import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { GalleriaModule } from 'primeng/galleria';
import { TransactionAmountPerCategory } from '../../../../shared/interfaces/report/transaction-amount-per-category.interface';

// Tipos do Chart.js para 'pie'
import { Chart, ChartData, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-transactions-per-category-charts',
  standalone: true,
  imports: [CommonModule, ChartModule, GalleriaModule],
  templateUrl: './transactions-per-category-charts.component.html',
  styleUrl: './transactions-per-category-charts.component.scss',
})
export class TransactionsPerCategoryChartsComponent implements OnInit {
  constructor() {
    Chart.register(ChartDataLabels);
  }

  expenses: TransactionAmountPerCategory[] = [
    { category: 'Food', totalAmount: 1200 },
    { category: 'Transport', totalAmount: 300 },
    { category: 'Entertainment', totalAmount: 450 },
    { category: 'Utilities', totalAmount: 600 },
    { category: 'Health', totalAmount: 200 },
  ];
  income: TransactionAmountPerCategory[] = [
    { category: 'Salary', totalAmount: 5000 },
    { category: 'Freelance', totalAmount: 1500 },
    { category: 'Investments', totalAmount: 800 },
    { category: 'Gifts', totalAmount: 300 },
    { category: 'Other', totalAmount: 200 },
  ];

  chartData: { title: string; items: TransactionAmountPerCategory[] }[] = [];
  chartOptions!: ChartOptions<'pie'>;

  ngOnInit() {
    this.chartData = [
      { title: 'Monthly Expense', items: this.expenses },
      { title: 'Monthly Income', items: this.income },
    ];

    this.configureChartOptions();
  }

  private configureChartOptions(): void {
    this.chartOptions = {
      elements: {
        arc: {
          borderWidth: 0,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        datalabels: {
          display: false,
        },
      },
    };
  }

  getChartData(data: TransactionAmountPerCategory[]): ChartData<'pie'> {
    const backgroundColors = ['#7C73F6', '#FA8C75', '#63D2D1', '#EF5350', '#AB47BC'];
    return {
      labels: data.map((item) => item.category),
      datasets: [
        {
          data: data.map((item) => item.totalAmount),
          backgroundColor: backgroundColors,
          hoverBackgroundColor: backgroundColors,
        },
      ],
    };
  }

  public getLegendColor(chartData: ChartData<'pie'>, index: number): string {
    const colors = chartData.datasets[0].backgroundColor;

    if (Array.isArray(colors) && colors[index]) {
      return colors[index];
    }
    if (typeof colors === 'string') {
      return colors;
    }
    return '#CCCCCC';
  }
}
