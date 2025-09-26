import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { Header } from './shared/components/header/header';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('SaveMoneySlotFront');
  constructor(private primeng: PrimeNG, private authService: AuthService) {}

  onLogout = () => {
    this.authService.logout();
  };

  isLogged = false;

  ngOnInit() {
    this.primeng.ripple.set(true);
    this.isLogged = this.authService.isLoggedIn();
  }
}
