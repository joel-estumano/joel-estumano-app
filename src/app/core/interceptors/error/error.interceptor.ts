import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
	const router = inject(Router);

	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			switch (error.status) {
				default:
					router.navigate(['/error'], { state: { status: error.status } });
					break;
			}
			return throwError(() => error);
		})
	);
};
