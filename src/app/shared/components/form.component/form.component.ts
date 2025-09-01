import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'password' | 'email' | 'number' | 'date' | 'select';
  validators?: { type: string; message: string }[];
  options?: { label: string; value: any }[];
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,
    // SelectModule,
    InputNumberModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input() form!: FormGroup;
  @Input() fields: FormField[] = [];
  @Input() submitButtonLabel: string = 'Submit';

  passwordVisibility: { [key: string]: boolean } = {};

  constructor() {}

  togglePasswordVisibility(fieldName: string): void {
    this.passwordVisibility[fieldName] = !this.passwordVisibility[fieldName];
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
