import { Component, Input } from '@angular/core';
import {
  FormComponent,
  FormField,
} from '../../../../shared/components/form.component/form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionCategoryService } from '../../../../core/services/transactions/category/transaction-category.service';
import { TransactionType } from '../../../../shared/enums/transaction/transaction-type.enum';
import { Subject } from 'rxjs';
import { CreateTransactionCategoryInterface } from '../../../../shared/interfaces/transaction/category/create-transaction-category.interface';

@Component({
  selector: 'app-form-transaction-category',
  imports: [FormComponent],
  templateUrl: './form-transaction-category.html',
  styleUrl: './form-transaction-category.scss',
})
export class FormTransactionCategory {
  registerForm!: FormGroup;
  error: string | null = null;
  @Input() afterSubmit: () => void = () => {};

  constructor(
    private fb: FormBuilder,
    private transactionCategoryService: TransactionCategoryService
  ) {}

  formFields: FormField[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      validators: [{ type: 'required', message: 'Name is required.' }],
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      options: Object.keys(TransactionType).map((type) => ({
        label: type,
        value: type,
      })),
      validators: [{ type: 'required', message: 'Type is required.' }],
    },
  ];

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      type: ['', [Validators.required]],
    });
  }

  createTransactionCategory(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.error = null;

    const formValue = this.registerForm.value;
    const transactionCategoryData: CreateTransactionCategoryInterface = {
      name: formValue.name,
      type: formValue.type as TransactionType,
    };
    this.transactionCategoryService.createTransactionCategory(transactionCategoryData).subscribe(
      (transactionCategory) => {
        this.afterSubmit();
      },
      (err) => {
        this.error = 'Transaction category creation failed. Please try again.';
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
