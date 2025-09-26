import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { TransactionCountPerType } from '../../../shared/interfaces/report/transactions-count-per-type.interface';
import { HttpClient } from '@angular/common/http';
import { SavedMoneyPerMonth } from '../../../shared/interfaces/report/saved-money-per-month.interface';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private apiUrl = `${environment.apiUrl}/reports`;

  constructor(private http: HttpClient) {}

  getSavedMoneyByMonth(initialDate: Date, finalDate: Date) {
    return this.http.get<SavedMoneyPerMonth[]>(`${this.apiUrl}/saved-money-by-month`, {
      params: {
        initialDate: initialDate.toISOString().slice(0, 10),
        finalDate: finalDate.toISOString().slice(0, 10),
      },
    });
  }
  getMonthlyTransactionCountGroupedByType() {
    return this.http.get<TransactionCountPerType[]>(`${this.apiUrl}/transaction-count-per-type`);
  }
}
