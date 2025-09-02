import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

import { AuthService } from '../../../../core/services/auth.service';
import {
  FormComponent,
  FormField,
} from '../../../../shared/components/form.component/form.component';

@Component({
  selector: 'app-login-form',
  standalone: true, // 2. Adicionado standalone: true
  imports: [
    CommonModule,
    ReactiveFormsModule, // Trocado
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,
    FormComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  error: string | null = null;

  formFields: FormField[] = [
    {
      name: 'email',
      label: 'Digite seu email',
      type: 'email',
      validators: [
        { type: 'required', message: 'O email é obrigatório.' },
        { type: 'email', message: 'Por favor, insira um email válido.' },
      ],
    },
    {
      name: 'password',
      label: 'Digite sua senha',
      type: 'password',
      validators: [{ type: 'required', message: 'A senha é obrigatória.' }],
    },
  ];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  login(credentials: LoginCredential): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.error = null;

    this.authService
      .login(credentials)
      .pipe(takeUntil(this.destroy$)) // 9. Gerenciamento da subscription
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.error = 'Usuário ou senha inválidos.';
          console.error(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
