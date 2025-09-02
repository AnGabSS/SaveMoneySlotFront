import { Component, ViewChild } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RegisterUserComponent } from '../../components/register-user/register-user.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent, RegisterUserComponent, DialogModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  visible: boolean = false;

  @ViewChild('registerUserForm') registerUserFormComponent!: RegisterUserComponent;

  showDialog() {
    this.visible = true;
  }

  onHide = () => {
    if (this.registerUserFormComponent) {
      this.registerUserFormComponent.resetForm();
    }
  };

  hideDialog = () => {
    this.visible = false;
  };
}
