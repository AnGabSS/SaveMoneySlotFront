import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { PageResponse } from '../../../../shared/interfaces/page-response.interface';
import { TransactionCategory } from '../../../../shared/interfaces/transaction/category/transaction-category.interface';
import { Observable } from 'rxjs';
import { CreateTransactionCategoryInterface } from '../../../../shared/interfaces/transaction/category/create-transaction-category.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionCategoryService {
  private apiUrl = `${environment.apiUrl}/transaction/category`;

  constructor(private http: HttpClient) {}

  getTransactionCategories(
    page?: number | string,
    size?: number | string,
    orderBy?: string,
    direction?: string
  ): Observable<PageResponse<TransactionCategory>> {
    return this.http.get<PageResponse<TransactionCategory>>(`${this.apiUrl}`, {
      params: {
        page: page || 1,
        size: size || 10,
        orderBy: orderBy || 'name',
        direction: direction || 'DESC',
      },
    });
  }

  createTransactionCategory(
    transactionCategory: CreateTransactionCategoryInterface
  ): Observable<TransactionCategory> {
    return this.http.post<TransactionCategory>(`${this.apiUrl}`, transactionCategory);
  }
}
