import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Transaction } from '../../../shared/interfaces/transaction/transaction.interface';
import { map, Observable } from 'rxjs';
import { PageResponse } from '../../../shared/interfaces/page-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = `${environment.apiUrl}/transaction`;

  constructor(private http: HttpClient) {}

  getTransactions(
    page?: number | string,
    size?: number | string,
    orderBy?: string,
    direction?: string
  ): Observable<PageResponse<Transaction>> {
    return this.http
      .get<PageResponse<Transaction>>(`${this.apiUrl}`, {
        params: {
          page: page || 1,
          size: size || 10,
          orderBy: orderBy || 'createdAt',
          direction: direction || 'DESC',
        },
      })
      .pipe(
        map((res: PageResponse<Transaction>) => {
          return res;
        })
      );
  }
}
