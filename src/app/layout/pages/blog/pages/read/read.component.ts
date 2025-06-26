import { BlogService } from '../../service/blog.service';
import { Component, Input, signal } from '@angular/core';
import { IPost } from '@types';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { posts } from '../../constants';

@Component({
	selector: 'app-read',
	standalone: false,
	templateUrl: './read.component.html'
})
export class ReadComponent {
	protected data = signal<IPost | undefined>(undefined);
	protected $data!: Observable<IPost | undefined>;

	@Input()
	set id(id: string) {
		const data = posts.find((p) => p.id === id);
		if (data) {
			this.data.set(data);
			this.$data = this.blogService.contentPost(data.id);
		}
	}

	constructor(
		private location: Location,
		private blogService: BlogService
	) {}

	goBack(): void {
		this.location.back();
	}
}
