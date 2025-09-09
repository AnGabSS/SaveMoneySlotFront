import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { SavedMoneyPerMonth } from '../../../../shared/interfaces/report/saved-money-per-month.interface';
import { savedMoneyMocked } from '../../../../core/utils/get-mocked-data';

@Component({
  selector: 'app-saved-money-chart',
  imports: [ChartModule],
  templateUrl: './saved-money-chart.component.html',
  styleUrl: './saved-money-chart.component.scss',
})
export class SavedMoneyChartComponent {
  data: SavedMoneyPerMonth[] = savedMoneyMocked;

  chartData = {
    labels: this.data.map((entry) => entry.month),
    datasets: [
      {
        label: 'My First Dataset',
        data: this.data.map((entry) => entry.amountSaved),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.5,
      },
    ],
  };

  chartOptions = {
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
}
