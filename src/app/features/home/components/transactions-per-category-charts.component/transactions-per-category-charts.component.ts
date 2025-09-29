import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

import Chart from 'chart.js/auto';
import { ChartData, ChartOptions } from 'chart.js';
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
  styleUrls: ['./transactions-per-category-charts.component.scss'],
})
export class TransactionsPerCategoryChartsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('chartCanvas') chartCanvases!: QueryList<ElementRef>;

  expenses: TransactionCountPerCategory[] = [];
  income: TransactionCountPerCategory[] = [];

  chartData: { title: string; items: TransactionCountPerCategory[] }[] = [];
  chartOptions!: ChartOptions<'pie'>;
  private chartInstances = new Map<HTMLCanvasElement, Chart>();
  private resizeObservers = new Map<HTMLCanvasElement, ResizeObserver>();
  private boundWindowHandlersAdded = false;

  constructor(private reportService: ReportsService, private cdr: ChangeDetectorRef) {
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
          this.chartData = [];

          if (this.expenses.length > 0) {
            this.chartData.push({ title: 'Monthly Expense', items: this.expenses });
          }
          if (this.income.length > 0) {
            this.chartData.push({ title: 'Monthly Income', items: this.income });
          }
          this.configureChartOptions();
          this.cdr.detectChanges();
          setTimeout(() => this.createCharts(), 0);
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.chartCanvases.changes.subscribe(() => {
      this.createCharts();
    });
    setTimeout(() => this.createCharts(), 0);

    if (!this.boundWindowHandlersAdded) {
      const tryCreate = () => this.createCharts();
      window.addEventListener('resize', tryCreate);
      window.addEventListener('orientationchange', tryCreate);
      document.addEventListener('visibilitychange', tryCreate);
      this.boundWindowHandlersAdded = true;
    }
  }

  private createCharts(): void {
    this.chartCanvases.forEach((canvasRef, index) => {
      const canvas = canvasRef.nativeElement as HTMLCanvasElement;
      const chartDataItem = this.chartData[index];
      if (!chartDataItem || !canvas) return;

      const parent = canvas.parentElement as HTMLElement | null;
      const isVisible = !!(canvas.offsetParent !== null);
      const rect = (parent ?? canvas).getBoundingClientRect();
      const hasSize = rect.width > 0 && rect.height > 0;

      if (!isVisible || !hasSize) {
        this.observeUntilSized(canvas, () => this.ensureChart(canvas, chartDataItem.items));
        this.scheduleCreateRetry(canvas, chartDataItem.items, 12, 100);
        return;
      }

      this.ensureChart(canvas, chartDataItem.items);
    });
  }

  onGalleriaChange(): void {
    setTimeout(() => this.createCharts(), 0);
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

  public getLabelsArray(chartData: ChartData<'pie'>): (string | number)[] {
    const labels = chartData.labels as unknown;
    if (Array.isArray(labels)) {
      return labels as (string | number)[];
    }
    if (labels && typeof labels === 'object') {
      try {
        return Object.values(labels as Record<string, unknown>) as (string | number)[];
      } catch {
        return [];
      }
    }
    return [];
  }

  ngOnDestroy(): void {
    this.chartInstances.forEach((chart) => {
      try {
        chart.destroy();
      } catch {}
    });
    this.chartInstances.clear();
    this.resizeObservers.forEach((ro) => {
      try {
        ro.disconnect();
      } catch {}
    });
    this.resizeObservers.clear();

    if (this.boundWindowHandlersAdded) {
      const tryCreate = () => this.createCharts();
      window.removeEventListener('resize', tryCreate);
      window.removeEventListener('orientationchange', tryCreate);
      document.removeEventListener('visibilitychange', tryCreate);
      this.boundWindowHandlersAdded = false;
    }
  }

  private ensureChart(canvas: HTMLCanvasElement, items: TransactionCountPerCategory[]): void {
    const existing = Chart.getChart(canvas);
    if (existing) {
      existing.data = this.getChartData(items);
      existing.options = this.chartOptions;
      existing.update();
      existing.resize();
      this.chartInstances.set(canvas, existing);
      return;
    }

    const chart = new Chart(canvas, {
      type: 'pie',
      data: this.getChartData(items),
      options: this.chartOptions,
    });
    chart.resize();
    this.chartInstances.set(canvas, chart);
  }

  private observeUntilSized(canvas: HTMLCanvasElement, ready: () => void): void {
    if (this.resizeObservers.has(canvas)) return;
    const parent = canvas.parentElement as HTMLElement | null;
    if (!parent) {
      setTimeout(() => ready(), 50);
      return;
    }
    const ro = new ResizeObserver(() => {
      const hasSize = parent.clientWidth > 0 && parent.clientHeight > 0;
      const isVisible = !!(canvas.offsetParent !== null);
      if (hasSize && isVisible) {
        ro.disconnect();
        this.resizeObservers.delete(canvas);
        ready();
      }
    });
    ro.observe(parent);
    this.resizeObservers.set(canvas, ro);
  }

  private scheduleCreateRetry(
    canvas: HTMLCanvasElement,
    items: TransactionCountPerCategory[],
    attempts: number,
    delayMs: number
  ): void {
    if (attempts <= 0) return;
    setTimeout(() => {
      const parent = canvas.parentElement as HTMLElement | null;
      const isVisible = !!(canvas.offsetParent !== null);
      const rect = (parent ?? canvas).getBoundingClientRect();
      const hasSize = rect.width > 0 && rect.height > 0;
      if (isVisible && hasSize) {
        this.ensureChart(canvas, items);
      } else {
        this.scheduleCreateRetry(canvas, items, attempts - 1, delayMs);
      }
    }, delayMs);
  }
}
