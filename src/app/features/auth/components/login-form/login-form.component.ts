import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
// 1. Trocamos FormsModule por ReactiveFormsModule
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// Imports do PrimeNG
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

// Serviços e Modelos
import { AuthService } from '../../../../core/services/auth.service';

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
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  showPassword = false;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.error = null;
    const credentials: LoginCredential = this.loginForm.value;

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
