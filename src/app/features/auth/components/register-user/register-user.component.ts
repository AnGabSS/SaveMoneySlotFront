import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FormComponent,
  FormField,
} from '../../../../shared/components/form.component/form.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register-user',
  imports: [FormComponent],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss',
})
export class RegisterUserComponent {
  registerForm!: FormGroup;
  error: string | null = null;

  formFields: FormField[] = [
    {
      name: 'name',
      label: 'Type your name',
      type: 'text',
      validators: [
        { type: 'required', message: 'Name is required.' },
        { type: 'minlength', message: 'Name must be at least 3 characters long.' },
      ],
    },
    {
      name: 'email',
      label: 'Type your email',
      type: 'email',
      validators: [
        { type: 'required', message: 'Email is required.' },
        { type: 'email', message: 'Please, insert a valid email.' },
      ],
    },
    {
      name: 'password',
      label: 'Digite sua senha',
      type: 'password',
      validators: [{ type: 'required', message: 'Password is required.' }],
    },
    {
      name: 'confirmPassword',
      label: 'Confirm your password',
      type: 'password',
      validators: [{ type: 'required', message: 'Confirming your password is required.' }],
    },
    {
      name: 'birthdate',
      label: 'Type your birthdate',
      type: 'date',
      validators: [{ type: 'required', message: 'Birthdate is required.' }],
    },
  ];
  constructor(private fb: FormBuilder) {}

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      confirmPassword: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
    });
  }

  register(): void {
    console.log(this.registerForm.value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
