import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotifierService } from '../../shared/services/notifier.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const notifierService = inject(NotifierService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/auth/login']);
        notifierService.error('Session expired. Please log in again.');
      } else if (error.status === 403) {
        notifierService.error('You do not have permission to perform this action.');
      } else if (error.error && typeof error.error === 'string') {
        notifierService.error(error.error);
      } else if (error.error?.title) {
        // Handle standard ASP.NET Core ProblemDetails
        notifierService.error(error.error.title);
      } else {
        notifierService.error('An unexpected error occurred. Please try again.');
      }

      return throwError(() => error);
    })
  );
};
