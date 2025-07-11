import { BlogService } from '../../service/blog.service';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { IBlogPost } from '@types';

@Component({
	selector: 'app-list',
	standalone: false,
	templateUrl: './list.component.html'
})
export class ListComponent {
	blogPosts$!: Observable<IBlogPost[]>;

	constructor(private readonly blogService: BlogService) {
		this.blogPosts$ = this.blogService.list();
	}
}
