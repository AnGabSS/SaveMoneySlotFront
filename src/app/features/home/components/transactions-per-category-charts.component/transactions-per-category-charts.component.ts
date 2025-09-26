import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

import { Chart, ChartData, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { TransactionCountPerCategory } from '../../../../shared/interfaces/report/transaction-count-per-category.interface';
import { ReportsService } from '../../../../core/services/reports/reports.service';
import { tap } from 'rxjs';
import { TransactionType } from '../../../../shared/enums/transaction/transaction-type.enum';
import { TransactionCountPerType } from '../../../../shared/interfaces/report/transactions-count-per-type.interface';

@Component({
  selector: 'app-transactions-per-category-charts',
  standalone: true,
  imports: [CommonModule, GalleriaModule],
  templateUrl: './transactions-per-category-charts.component.html',
  styleUrl: './transactions-per-category-charts.component.scss',
})
export class TransactionsPerCategoryChartsComponent implements OnInit, AfterViewInit {
  @ViewChildren('chartCanvas') chartCanvases!: QueryList<ElementRef>;

  expenses: TransactionCountPerCategory[] = [];
  income: TransactionCountPerCategory[] = [];

  chartData: { title: string; items: TransactionCountPerCategory[] }[] = [];
  chartOptions!: ChartOptions<'pie'>;

  constructor(private reportService: ReportsService) {
    Chart.register(ChartDataLabels);
  }

  ngOnInit() {
    this.reportService
      .getMonthlyTransactionCountGroupedByType()
      .pipe(
        tap((valuePerType) => {
          valuePerType.forEach((value: TransactionCountPerType) => {
            switch (value.type) {
              case TransactionType.EXPENSE:
                this.expenses = value.transactionsQuantity;
                break;
              case TransactionType.INCOME:
                this.income = value.transactionsQuantity;
                break;
              default:
                break;
            }
          });
          this.chartData = [
            { title: 'Monthly Expense', items: this.expenses },
            { title: 'Monthly Income', items: this.income },
          ];
          this.configureChartOptions();
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.chartCanvases.changes.subscribe(() => {
      this.createCharts();
    });
    setTimeout(() => this.createCharts(), 0);
  }

  private createCharts(): void {
    this.chartCanvases.forEach((canvasRef, index) => {
      const chartDataItem = this.chartData[index];
      if (chartDataItem && canvasRef.nativeElement) {
        if (Chart.getChart(canvasRef.nativeElement)) {
          Chart.getChart(canvasRef.nativeElement)?.destroy();
        }

        new Chart(canvasRef.nativeElement, {
          type: 'pie',
          data: this.getChartData(chartDataItem.items),
          options: this.chartOptions,
        });
      }
    });
  }

  private configureChartOptions(): void {
    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 1.8,
      layout: {
        padding: 10,
      },
      elements: { arc: { borderWidth: 0 } },
      plugins: {
        legend: { display: false },
        datalabels: { display: false },
      },
    };
  }

  getChartData(data: TransactionCountPerCategory[]): ChartData<'pie'> {
    const backgroundColors = ['#7C73F6', '#FA8C75', '#63D2D1', '#EF5350', '#AB47BC'];
    return {
      labels: data.map((item) => item.category),
      datasets: [
        {
          data: data.map((item) => item.amount),
          backgroundColor: backgroundColors,
          hoverBackgroundColor: backgroundColors,
        },
      ],
    };
  }

  public getLegendColor(chartData: ChartData<'pie'>, index: number): string {
    const colors = chartData.datasets[0].backgroundColor;
    if (Array.isArray(colors) && colors[index]) return colors[index] as string;
    if (typeof colors === 'string') return colors;
    return '#CCCCCC';
  }
}
