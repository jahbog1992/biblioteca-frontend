import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { NotificationsService } from 'angular2-notifications';

export const isNotLogged: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const canContinue = !authService.loggedIn();
  if (!canContinue) {
    const notifications = inject(NotificationsService);
    notifications.warn(
      'Ya has iniciado sesión',
      'No puedes acceder a esta página'
    );
    const router = inject(Router);
    router.navigate(['/login']);
  } 
  return canContinue;
};

export const isLogged: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const canContinue = authService.loggedIn();
  if (!canContinue) {
    const notifications = inject(NotificationsService);
    notifications.warn(
      'Debes iniciar sesión',
      'No puedes acceder a esta página'
    );
    const router = inject(Router);
    router.navigate(['/login']);
  }
  return canContinue;
};

export const isAdmin: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const canContinue = authService.isAdministrator();
  if (!canContinue) {
    const notifications = inject(NotificationsService);
    notifications.warn(
      'Debes ser administrador',
      'No puedes acceder a esta página'
    );
    const router = inject(Router);
    router.navigate(['/login']);
  }
  return canContinue;
};
 