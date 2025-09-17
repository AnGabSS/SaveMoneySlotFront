import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// Importação direta do Chart.js
import { Chart } from 'chart.js/auto'; 
import { SavedMoneyPerMonth } from '../../../../shared/interfaces/report/saved-money-per-month.interface';
import { savedMoneyMocked } from '../../../../core/utils/get-mocked-data';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-saved-money-chart',
  standalone: true, // Adicionamos 'standalone: true' pois não usamos mais módulos
  imports: [], // Removemos o ChartModule
  templateUrl: './saved-money-chart.component.html',
  styleUrl: './saved-money-chart.component.scss',
})
export class SavedMoneyChartComponent implements AfterViewInit {
  // @ViewChild busca uma referência de um elemento no nosso HTML.
  // Estamos buscando o elemento que tem a marcação #chartCanvas
  @ViewChild('chartCanvas') private chartCanvas!: ElementRef;
  
  // Seus dados continuam os mesmos
  data: SavedMoneyPerMonth[] = savedMoneyMocked;

  chartData = {
    labels: this.data.map((entry) => entry.month),
    datasets: [
      {
        label: 'Money Saved', // Alterado para um nome mais claro
        data: this.data.map((entry) => entry.amountSaved),
        fill: false,
        borderColor: '#00BFA6', // Cor mais vibrante
        tension: 0.4, // Suavidade da linha
        backgroundColor: '#00BFA6',
      },
    ],
  };

  // Suas opções de gráfico continuam as mesmas, estão ótimas!
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 10,
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: '#ffffff',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#ffffff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
      x: {
        ticks: {
          color: '#ffffff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
  };

  /**
   * ngAfterViewInit é um "gancho" do ciclo de vida do Angular que é executado
   * logo após o Angular inicializar a view do componente.
   * É o lugar perfeito para criar o gráfico, pois garante que o <canvas> já existe na página.
   */
  ngAfterViewInit(): void {
    new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: this.chartData,
      options: this.chartOptions,
    });
  }
}