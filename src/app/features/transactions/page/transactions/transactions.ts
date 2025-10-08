import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
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
import { FormTransactionCategory } from '../../components/form-transaction-category/form-transaction-category';

@Component({
  selector: 'app-transactions',
  imports: [
    FormsModule,
    TransactionTableComponent,
    Pageable,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    DialogModule,
    FormTransaction,
    FormTransactionCategory,
  ],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class Transactions implements OnInit, OnChanges {
  transactionsData: Transaction[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  totalElements: number = 0;
  visibleTransactionDialog: boolean = false;
  visibleTransactionCategoryDialog: boolean = false;
  search: string = '';
  private searchSubject = new Subject<string>();

  @ViewChild('createTransactionForm') transactionForm!: FormTransaction;
  @ViewChild('createTransactionCategoryForm') transactionCategoryForm!: FormTransactionCategory;

  hideDialog(dialogName: 'transaction' | 'transactionCategory'): void {
    const isTransaction = dialogName === 'transaction';
    this[isTransaction ? 'visibleTransactionDialog' : 'visibleTransactionCategoryDialog'] = false;
    this[isTransaction ? 'transactionForm' : 'transactionCategoryForm'].resetForm();
  }

  showDialog(dialogName: 'transaction' | 'transactionCategory'): void {
    this[
      dialogName === 'transaction' ? 'visibleTransactionDialog' : 'visibleTransactionCategoryDialog'
    ] = true;
  }

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();

    // Setup search debouncing
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchTerm) => {
      this.search = searchTerm;
      this.currentPage = 1; // Reset to first page when searching
      this.loadTransactions();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visibleTransactionCategoryDialog']) {
      this.transactionForm.ngOnInit();
    }
    if (changes['visibleTransactionDialog']) {
      this.ngOnInit();
    }
  }

  private loadTransactions(): void {
    this.transactionService
      .getTransactions(this.search, this.currentPage, this.pageSize)
      .subscribe((response) => {
        this.transactionsData = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
      });
  }

  onSearchChange(): void {
    this.searchSubject.next(this.search);
  }

  onFormSuccess(dialogName: 'transaction' | 'transactionCategory'): void {
    this.hideDialog(dialogName);
    if (dialogName === 'transaction') {
      this.loadTransactions();
    } else {
      this.transactionForm.reloadCategories();
    }
  }
}
