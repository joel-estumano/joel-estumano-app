import { throwError } from 'rxjs';
import { errorInterceptor } from './error.interceptor';
import { HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

describe('errorInterceptor', () => {
	let routerSpy: jasmine.SpyObj<Router>;

	beforeEach(() => {
		routerSpy = jasmine.createSpyObj('Router', ['navigate']);

		TestBed.configureTestingModule({
			providers: [{ provide: Router, useValue: routerSpy }]
		});
	});

	function createHandlerWithError(status: number): HttpHandlerFn {
		return () => throwError(() => new HttpErrorResponse({ status, statusText: 'Error', url: '/test' }));
	}

	it('deve redirecionar para /not-found em erro 404', (done) => {
		const req = new HttpRequest('GET', '/test');

		TestBed.runInInjectionContext(() => {
			errorInterceptor(req, createHandlerWithError(404)).subscribe({
				error: (err) => {
					expect(err.status).toBe(404);
					expect(routerSpy.navigate).toHaveBeenCalledWith(['/not-found'], {
						state: { status: 404 }
					});
					done();
				}
			});
		});
	});

	it('deve redirecionar para /error com status em outros erros', (done) => {
		const req = new HttpRequest('GET', '/test');

		TestBed.runInInjectionContext(() => {
			errorInterceptor(req, createHandlerWithError(500)).subscribe({
				error: (err) => {
					expect(err.status).toBe(500);
					expect(routerSpy.navigate).toHaveBeenCalledWith(['/error'], {
						state: { status: 500 }
					});
					done();
				}
			});
		});
	});

	it('deve propagar o erro após redirecionar', (done) => {
		const req = new HttpRequest('GET', '/test');

		TestBed.runInInjectionContext(() => {
			errorInterceptor(req, createHandlerWithError(403)).subscribe({
				error: (err) => {
					expect(err.status).toBe(403);
					expect(routerSpy.navigate).toHaveBeenCalledWith(['/error'], {
						state: { status: 403 }
					});
					done();
				}
			});
		});
	});
});
