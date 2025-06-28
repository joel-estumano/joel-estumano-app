import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	private readonly apiUrl: string;
	private readonly headers: HttpHeaders;

	/**
	 * @param httpClient - Cliente HTTP Angular para fazer requisições.
	 */
	constructor(private httpClient: HttpClient) {
		this.apiUrl = environment.apiUrl;
		this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	}

	/**
	 * Faz uma requisição GET.
	 * @param url - O endpoint a ser acessado.
	 * @returns Observable<T> - Observable contendo a resposta tipada.
	 */
	public get<T>(url: string): Observable<T> {
		return this.httpClient
			.get<T>(`${this.apiUrl}/${url}`, {
				headers: this.headers
			})
			.pipe(catchError(this.errorHandler.bind(this)));
	}

	/**
	 * Faz uma requisição PUT.
	 * @param url - O endpoint a ser acessado.
	 * @param body - O corpo da requisição do tipo TInput.
	 * @returns Observable<TOutput> - Observable contendo a resposta tipada.
	 */
	public put<TInput, TOutput>(url: string, body: TInput): Observable<TOutput> {
		return this.httpClient
			.put<TOutput>(`${this.apiUrl}/${url}`, body, {
				headers: this.headers
			})
			.pipe(catchError(this.errorHandler.bind(this)));
	}

	/**
	 * Faz uma requisição PATCH.
	 * @param url - O endpoint a ser acessado.
	 * @param body - O corpo da requisição do tipo TInput.
	 * @returns Observable<TOutput> - Observable contendo a resposta tipada.
	 */
	public patch<TInput, TOutput>(url: string, body: TInput): Observable<TOutput> {
		return this.httpClient
			.patch<TOutput>(`${this.apiUrl}/${url}`, body, {
				headers: this.headers
			})
			.pipe(catchError(this.errorHandler.bind(this)));
	}

	/**
	 * Faz uma requisição POST.
	 * @param url - O endpoint a ser acessado.
	 * @param body - O corpo da requisição do tipo TInput.
	 * @returns Observable<TOutput> - Observable contendo a resposta tipada.
	 */
	public post<TInput, TOutput>(url: string, body: TInput): Observable<TOutput> {
		return this.httpClient
			.post<TOutput>(`${this.apiUrl}/${url}`, body, {
				headers: this.headers
			})
			.pipe(catchError(this.errorHandler.bind(this)));
	}

	/**
	 * Faz uma requisição DELETE.
	 * @param url - O endpoint a ser acessado.
	 * @returns Observable<T> - Observable contendo a resposta tipada.
	 */
	public delete<T>(url: string): Observable<T> {
		return this.httpClient
			.delete<T>(`${this.apiUrl}/${url}`, {
				headers: this.headers
			})
			.pipe(catchError(this.errorHandler.bind(this)));
	}

	/**
	 * Manipula erros de requisição HTTP.
	 * @param error - O erro HTTP.
	 * @returns Observable<never> - Observable que lança um erro.
	 */
	private errorHandler(error: HttpErrorResponse): Observable<never> {
		const mensagem = error?.error?.message || error.message || 'Erro desconhecido';
		return throwError(() => new Error(mensagem));
	}
}
