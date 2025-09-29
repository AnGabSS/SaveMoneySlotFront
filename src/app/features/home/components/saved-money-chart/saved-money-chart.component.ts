import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto'; // Importação única
import { SavedMoneyPerMonth } from '../../../../shared/interfaces/report/saved-money-per-month.interface';
import { ReportsService } from '../../../../core/services/reports/reports.service';

@Component({
  selector: 'app-saved-money-chart',
  standalone: true,
  imports: [],
  templateUrl: './saved-money-chart.component.html',
  styleUrls: ['./saved-money-chart.component.scss'],
})
export class SavedMoneyChartComponent implements OnInit {
  constructor(private reportService: ReportsService) {}

  @ViewChild('chartCanvas') private chartCanvas!: ElementRef;
  chart: Chart | null = null;

  ngOnInit(): void {
    const now = new Date();
    const firstDayOfCurrentYear = new Date(now.getFullYear(), 0, 1);

    this.reportService
      .getSavedMoneyByMonth(firstDayOfCurrentYear, now)
      .subscribe((apiData: SavedMoneyPerMonth[]) => {
        this.createChart(apiData);
      });
  }

  createChart(data: SavedMoneyPerMonth[]): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const chartData = {
      labels: data.map((entry) => entry.month),
      datasets: [
        {
          label: 'Money Saved',
          data: data.map((entry) => entry.savedMoney),
          fill: false,
          borderColor: '#00BFA6',
          tension: 0.4,
          backgroundColor: '#00BFA6',
        },
      ],
    };

    const chartOptions: ChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 1.8,
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

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });
  }
}
