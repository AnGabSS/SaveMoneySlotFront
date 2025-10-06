import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionTableComponent } from '../../../../shared/components/transaction-table.component/transaction-table.component';
import { Transaction } from '../../../../shared/interfaces/transaction/transaction.interface';
import { Pageable } from '../../../../shared/components/pageable/pageable';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { TransactionService } from '../../../../core/services/transactions/transaction.service';
import { DialogModule } from 'primeng/dialog';
import { FormTransaction } from '../../components/form-transaction/form-transaction';

@Component({
  selector: 'app-transactions',
  imports: [
    TransactionTableComponent,
    Pageable,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    DialogModule,
    FormTransaction,
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
  visible: boolean = false;

  @ViewChild('createTransactionForm') transactionForm!: FormTransaction;

  showDialog(): void {
    this.visible = true;
  }

  hideDialog(): void {
    this.visible = false;
    this.transactionForm.resetForm();
  }

  onHide(): void {
    this.visible = false;
    this.transactionForm.resetForm();
  }

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
