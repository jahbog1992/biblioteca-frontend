import { Routes } from '@angular/router';
import { isAdmin, isLogged, isNotLogged } from './app.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  }, 
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    canActivate: [isNotLogged],
  }, 
  {
    path: 'event-detail',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'admin',
    pathMatch: 'prefix',
    loadComponent: () =>
      import('./admin/admin.component').then((m) => m.AdminComponent),
    canActivate: [isLogged, isAdmin],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sales',
      },
      {
        path: 'sales',
        pathMatch: 'full',
        loadComponent: () =>
          import('./admin/sales/sales.component').then((m) => m.SalesComponent),
      },
      {
        path: 'events',
        pathMatch: 'full',
        loadComponent: () =>
          import('./admin/events/events.component').then(
            (m) => m.EventsComponent
          ),
      },
      {
        path: 'libros',
        pathMatch: 'full',
        loadComponent: () =>
          import('./admin/libros/libros.component').then(
            (m) => m.Librosomponent 
          ),
      },
      {
        path: 'reports',
        pathMatch: 'full',
        loadComponent: () =>
          import('./admin/reports/reports.component').then(
            (m) => m.ReportsComponent
          ),
      },
    ],
  },
]; 
