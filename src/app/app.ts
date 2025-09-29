import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { Header } from './shared/components/header/header';
import { AuthService } from './core/services/auth.service';
import { Signal } from '@angular/core'; // É uma boa prática importar o tipo

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('SaveMoneySlotFront');

  isLogged: Signal<boolean>;

  constructor(private primeng: PrimeNG, private authService: AuthService) {
    this.isLogged = this.authService.isLoggedIn;
  }

  onLogout = () => {
    this.authService.logout();
  };

  ngOnInit() {
    this.primeng.ripple.set(true);
  }
}
