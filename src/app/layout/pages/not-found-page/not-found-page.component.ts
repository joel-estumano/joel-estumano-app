import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SectionComponent } from '../../components/section/section.component';

@Component({
	selector: 'app-not-found-page',
	imports: [SectionComponent],
	templateUrl: './not-found-page.component.html'
})
export class NotFoundPageComponent {
	status = signal<number>(0);

	constructor(private router: Router) {
		const nav = this.router.getCurrentNavigation();
		this.status.set(nav?.extras?.state?.['status']);
	}
}
