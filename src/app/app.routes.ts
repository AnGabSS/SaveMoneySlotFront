import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { HomePage } from './features/home/pages/home/home.page';
import { authGuard } from './core/guards/auth-guard';
import { Transactions } from './features/transactions/page/transactions/transactions';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: '',
    component: HomePage,
    canActivate: [authGuard],
  },
  {
    path: 'transactions',
    component: Transactions,
    canActivate: [authGuard],
  },
];
