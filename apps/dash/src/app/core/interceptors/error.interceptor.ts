import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { NotifierService } from '@shared/services/notifier.service';
import { notiq } from 'notique';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const notifierService = inject(NotifierService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/auth/login']);
        notifierService.error('Ops,you need to log in again.');
      } else if (error.status === 403) {
        notifierService.error('Ops, you don\'t have permission to perform this action.');
      } else if (error.status >= 500) {
        notifierService.error('Ops, a server error occurred. Check backend logs for details.');
      } else if (error.error && typeof error.error === 'string') {
        notifierService.error(error.error.length > 150 ? 'An unexpected error occurred.' : error.error);
      } else if (error.error?.errors) {
        const errorMessages = Object.values(error.error.errors)
          .flat()
          .join(' ');
        notifierService.error(errorMessages);
      } else if (error.error?.detail) {
        notifierService.error(error.error.detail);
      } else if (error.error?.title) {
        notifierService.error(error.error.title);
      } else {
        notiq.error({ message: 'An unexpected error occurred. Please try again.', position: 'top-center', duration: 5000 });
      }

      return throwError(() => error);
    })
  );
};
