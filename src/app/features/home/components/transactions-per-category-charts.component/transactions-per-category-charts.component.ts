import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
// MANTEMOS A GALLERIA, REMOVEMOS O CHARTMODULE
import { GalleriaModule } from 'primeng/galleria';
import { TransactionAmountPerCategory } from '../../../../shared/interfaces/report/transaction-amount-per-category.interface';

// Tipos e importações diretas do Chart.js
import { Chart, ChartData, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-transactions-per-category-charts',
  standalone: true,
  // Apenas o ChartModule foi removido das importações
  imports: [CommonModule, GalleriaModule],
  templateUrl: './transactions-per-category-charts.component.html',
  styleUrl: './transactions-per-category-charts.component.scss',
})
export class TransactionsPerCategoryChartsComponent implements OnInit, AfterViewInit {
  // @ViewChildren é usado para pegar TODOS os elementos com a referência #chartCanvas.
  // Perfeito para quando temos um *ngFor ou um componente como a galeria.
  @ViewChildren('chartCanvas') chartCanvases!: QueryList<ElementRef>;

  // Seus dados e a estrutura principal permanecem inalterados
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

  constructor() {
    Chart.register(ChartDataLabels);
  }

  ngOnInit() {
    this.chartData = [
      { title: 'Monthly Expense', items: this.expenses },
      { title: 'Monthly Income', items: this.income },
    ];
    this.configureChartOptions();
  }

  /**
   * ngAfterViewInit é executado depois que o Angular monta a tela.
   * É o momento ideal para procurar os <canvas> e desenhar os gráficos.
   */
  ngAfterViewInit(): void {
    this.chartCanvases.changes.subscribe(() => {
      this.createCharts();
    });
    // Chamamos uma vez aqui caso eles já estejam prontos.
    setTimeout(() => this.createCharts(), 0);
  }

  private createCharts(): void {
    // Para cada canvas encontrado, criamos um novo gráfico com os dados correspondentes
    this.chartCanvases.forEach((canvasRef, index) => {
      const chartDataItem = this.chartData[index];
      if (chartDataItem && canvasRef.nativeElement) {
        // Evita recriar o gráfico se ele já existir
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

  // Nenhuma mudança necessária nestes métodos
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
    if (Array.isArray(colors) && colors[index]) return colors[index] as string;
    if (typeof colors === 'string') return colors;
    return '#CCCCCC';
  }
}
