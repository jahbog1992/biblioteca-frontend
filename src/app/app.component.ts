import { Component, inject, OnInit } from '@angular/core'; 
import { LoginComponent } from './login/login.component'; 
import { RouterOutlet } from '@angular/router';
import {
  NotificationsService,
  Options,
  SimpleNotificationsModule,
} from 'angular2-notifications';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimpleNotificationsModule, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'musical-events';
  notificationOptions: Options = {
    position: ['top', 'right'],
    timeOut: 3000,
  };

  constructor() {
    const authService = inject(AuthService);
    authService.verifyLocalStorage();
  }
}
