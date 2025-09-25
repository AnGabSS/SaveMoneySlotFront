import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { TransactionCountPerType } from '../../../shared/interfaces/report/transactions-count-per-type.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private apiUrl = `${environment.apiUrl}/reports/transaction-count-per-type`;

  constructor(private http: HttpClient) {}

  getMonthlyTransactionCountGroupedByType() {
    return this.http.get<TransactionCountPerType[]>(this.apiUrl);
  }
}
