import { BlogService } from '../../service/blog.service';
import { Component, Input } from '@angular/core';
import { IBlogPost } from '@types';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-read',
	standalone: false,
	templateUrl: './read.component.html'
})
export class ReadComponent {
	blogPost$!: Observable<IBlogPost>;

	@Input()
	set id(id: string) {
		this.blogPost$ = this.blogService.read(id);
	}

	constructor(
		private location: Location,
		private blogService: BlogService
	) {}

	goBack(): void {
		this.location.back();
	}
}
