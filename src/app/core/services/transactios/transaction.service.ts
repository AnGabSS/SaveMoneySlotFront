import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Transaction } from '../../../shared/interfaces/transaction/transaction.interface';
import { map, Observable } from 'rxjs';

interface PageResponse<T> {
  content: T[];
  totalElements?: number;
  totalPages?: number;
  number?: number;
  size?: number;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = `${environment.apiUrl}/transaction`;

  constructor(private http: HttpClient) {}

  getTransactions(
    page?: string,
    size?: string,
    orderBy?: string,
    direction?: string
  ): Observable<Transaction[]> {
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
        map((res: PageResponse<Transaction> | Transaction[]) => {
          if (Array.isArray(res)) return res;
          return res?.content ?? [];
        })
      );
  }
}
