import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  imports: [MenubarModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Output() logoutClick = new EventEmitter<void>();

  constructor(private router: Router) {}

  onLogoutClick(): void {
    this.logoutClick.emit();
    this.router.navigate(['/login']);
  }

  menuItems: MenuItem[] = [
    {
      icon: 'pi pi-sign-out',
      command: () => this.onLogoutClick(),
    },
    {
      label: 'Transactions',
      url: '/transactions',
    },
    {
      label: 'Goals',
      url: '/goals',
    },
  ];
}
