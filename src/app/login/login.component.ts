import { Component, inject } from '@angular/core';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { SimpleHeaderComponent } from '../shared/components/simple-header/simple-header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SimpleHeaderComponent,
    FooterComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  authService = inject(AuthService);
  router = inject(Router);
  notifications = inject(NotificationsService);

  login() {
    const username = this.loginForm.controls.username.value!;
    const password = this.loginForm.controls.password.value!;
    this.authService.login(username, password).subscribe((response) => {
      if (response && response.success) {
        localStorage.setItem('token', response.data.token);
        this.authService.loggedIn.set(true);
        this.notifications.success(
          'Login Exitoso',
          'Bienvenido a Musical Events'
        ); 
        
        this.authService.isAdministrator.set(true);
        localStorage.setItem('isAdministrator', true.toString());
        this.router.navigate([true ? '/admin' : '/customer']);
      } else {
        this.notifications.warn('Login Fallido', 'Revisa tus credenciales');
      }
    });
  }
}
