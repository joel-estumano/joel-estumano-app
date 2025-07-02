import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SectionComponent } from '../../components/section/section.component';

@Component({
	selector: 'app-error-page',
	standalone: true,
	imports: [SectionComponent],
	templateUrl: './error-page.component.html'
})
export class ErrorPageComponent {
	status = signal<string>('');

	constructor(private router: Router) {
		const nav = this.router.getCurrentNavigation();
		this.status.set(nav?.extras?.state?.['status']);
	}
}
