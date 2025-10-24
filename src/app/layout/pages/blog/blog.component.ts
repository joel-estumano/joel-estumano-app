import { NgStyle } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-blog',
	imports: [NgStyle],
	templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {
	private sanitizer = inject(DomSanitizer);
	protected posts = signal<{ src: SafeResourceUrl; height: string; width: string; title: string; loading: boolean }[]>([]);

	ngOnInit(): void {
		const rawPosts = [
			{
				src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7387143803796623360',
				height: '1378',
				width: '504',
				title: 'Publicação incorporada',
				loading: true
			},
			{
				src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7384735801475248129',
				height: '1315',
				width: '504',
				title: 'Publicação incorporada',
				loading: true
			},
			{
				src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7336828722898952193',
				height: '1046',
				width: '504',
				title: 'Publicação incorporada',
				loading: true
			}
		];

		this.posts.set(
			rawPosts.map((post) => ({
				...post,
				src: this.sanitizer.bypassSecurityTrustResourceUrl(post.src)
			}))
		);
	}
}
