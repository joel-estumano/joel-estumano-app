import { HttpService } from '@core/services/http/http.service';
import { IBlogPost } from '@types';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'platform'
})
export class BlogService {
	constructor(private readonly httpService: HttpService) {}

	read(id: string): Observable<IBlogPost> {
		return this.httpService.get<IBlogPost>(`blog-posts/${id}`);
	}

	list(): Observable<IBlogPost[]> {
		return this.httpService.get<IBlogPost[]>(`blog-posts`);
	}
}
