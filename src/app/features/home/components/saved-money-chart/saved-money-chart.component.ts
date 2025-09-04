import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { SavedMoneyPerMonth } from '../../../../shared/interfaces/report/saved-money-per-month.interface';

@Component({
  selector: 'app-saved-money-chart',
  imports: [ChartModule],
  templateUrl: './saved-money-chart.component.html',
  styleUrl: './saved-money-chart.component.scss',
})
export class SavedMoneyChartComponent {
  data: SavedMoneyPerMonth[] = [
    { month: 'January', amountSaved: 200 },
    { month: 'February', amountSaved: 450 },
    { month: 'March', amountSaved: 300 },
    { month: 'April', amountSaved: 600 },
    { month: 'May', amountSaved: 500 },
    { month: 'June', amountSaved: 700 },
  ];

  chartData = {
    labels: this.data.map((entry) => entry.month),
    datasets: [
      {
        label: 'My First Dataset',
        data: this.data.map((entry) => entry.amountSaved),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  config = {
    type: 'line',
    data: this.chartData,
    options: {
      plugins: {
        legend: {
          labels: {
            color: '#ffffff',
          },
          title: {
            color: '#ffffff',
          },
        },
      },
    },
  };
}
