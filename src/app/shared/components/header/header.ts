import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Output() logoutClick = new EventEmitter<void>();

  constructor(private router: Router) {}

  onLogoutClick(): void {
    this.logoutClick.emit();
    this.router.navigate(['/']);
  }
}
