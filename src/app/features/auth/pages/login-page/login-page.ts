import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RegisterUserComponent } from '../../components/register-user/register-user.component';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent, RegisterUserComponent],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  visible: boolean = false;
  showDialog() {
    this.visible = true;
  }
}
