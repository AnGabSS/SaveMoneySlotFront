import { Component, OnInit } from '@angular/core';
import { TransactionTableComponent } from '../../../../shared/components/transaction-table.component/transaction-table.component';
import { TransactionService } from '../../../../core/services/transactios/transaction.service';
import { Transaction } from '../../../../shared/interfaces/transaction/transaction.interface';
import { Pageable } from '../../../../shared/components/pageable/pageable';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-transactions',
  imports: [
    TransactionTableComponent,
    Pageable,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
  ],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class Transactions implements OnInit {
  transactionsData: Transaction[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  totalElements: number = 0;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService
      .getTransactions(this.currentPage, this.pageSize)
      .subscribe((response) => {
        this.transactionsData = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
      });
  }
}
