import { HttpInterceptorFn } from '@angular/common/http';
import { inject, isDevMode } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  if (isDevMode()) {
    console.log('Request URL:', req.url);
    if (req.method === 'POST') {
      console.log('Request Body:', req.body);
    }
  }
  return isDevMode()
    ? next(req).pipe(tap((res) => console.log('Response:', res)))
    : next(req);
};

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let clonedRequest = req;
  const token = localStorage.getItem('token');
  if (token) {
    clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }
  return next(clonedRequest);
};

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Loading interceptor');
  const spinner = inject(NgxSpinnerService);
  return next(req).pipe(
    tap(() => {
      console.log('Loading initiated');
      spinner.show();
    }),
    finalize(() => {
      console.log('Loading completed');
      spinner.hide();
    })
  );
};
