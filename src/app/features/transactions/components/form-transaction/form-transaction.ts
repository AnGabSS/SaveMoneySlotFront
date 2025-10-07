import { Component, Input, OnInit } from '@angular/core';
import {
  FormComponent,
  FormField,
} from '../../../../shared/components/form.component/form.component';
import { TransactionCategory } from '../../../../shared/interfaces/transaction/category/transaction-category.interface';
import { TransactionCategoryService } from '../../../../core/services/transactions/category/transaction-category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { TransactionService } from '../../../../core/services/transactions/transaction.service';
import { CreateTransactionInterface } from '../../../../shared/interfaces/transaction/create-transaction.interface';

@Component({
  selector: 'app-form-transaction',
  imports: [FormComponent],
  templateUrl: './form-transaction.html',
  styleUrl: './form-transaction.scss',
})
export class FormTransaction implements OnInit {
  categories: TransactionCategory[] = [];
  registerForm!: FormGroup;
  error: string | null = null;
  @Input() afterSubmit: () => void = () => {};

  constructor(
    private fb: FormBuilder,
    private transactionCategoryService: TransactionCategoryService,
    private transactionService: TransactionService
  ) {}

  formFields: FormField[] = [];

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      value: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(1)]],
      category: ['', [Validators.required]],
    });

    this.transactionCategoryService.getTransactionCategories(1, 999).subscribe((res) => {
      this.categories = res.content;
      this.updateFormFields();
    });

    this.formFields = this.getBaseFormFields();
  }

  createTransaction(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.error = null;

    const formValue = this.registerForm.value;
    const transactionData: CreateTransactionInterface = {
      value: formValue.value,
      description: formValue.description,
      category: formValue.category,
    };
    this.transactionService.createTransaction(transactionData).subscribe(
      (transaction) => {
        alert('Transaction created successfully!');
        this.afterSubmit();
      },
      (err) => {
        this.error = 'Transaction creation failed. Please try again.';
        alert(err);
      }
    );
  }

  public resetForm(): void {
    if (this.registerForm) {
      this.registerForm.reset();

      Object.keys(this.registerForm.controls).forEach((key) => {
        this.registerForm.get(key)?.setErrors(null);
        this.registerForm.get(key)?.markAsPristine();
        this.registerForm.get(key)?.markAsUntouched();
      });
    }
  }

  private updateFormFields(): void {
    const categoryField: FormField = {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: this.categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
      validators: [{ type: 'required', message: 'Category is required.' }],
    };

    this.formFields = [
      ...this.getBaseFormFields().filter((f) => f.name !== 'category'),
      categoryField,
    ];
  }

  private getBaseFormFields(): FormField[] {
    return [
      {
        name: 'value',
        label: 'Value',
        type: 'number',
        validators: [{ type: 'required', message: 'Value is required.' }],
      },
      {
        name: 'description',
        label: 'Description',
        type: 'text',
        validators: [{ type: 'required', message: 'Description is required.' }],
      },
      {
        name: 'category',
        label: 'Category',
        type: 'select',
        options: [], // Inicializa vazio ou com placeholder
        validators: [{ type: 'required', message: 'Category is required.' }],
      },
    ];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
