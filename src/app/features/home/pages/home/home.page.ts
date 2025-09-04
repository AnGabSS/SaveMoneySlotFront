import { Component } from '@angular/core';
import { SavedMoneyChartComponent } from '../../components/saved-money-chart/saved-money-chart.component';

@Component({
  selector: 'app-home.page',
  imports: [SavedMoneyChartComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {}
