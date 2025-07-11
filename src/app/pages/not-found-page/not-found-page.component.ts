import { Component, signal } from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';
import { Router } from '@angular/router';
import { RouterLinkComponent } from '@shared/ui/router-link/router-link.component';
import { SectionComponent } from '@shared/components/section/section.component';

@Component({
	selector: 'app-not-found-page',
	imports: [SectionComponent, RouterLinkComponent, IconComponent],
	templateUrl: './not-found-page.component.html'
})
export class NotFoundPageComponent {
	status = signal<string>('');

	constructor(private router: Router) {
		const nav = this.router.getCurrentNavigation();
		this.status.set(nav?.extras?.state?.['status']);
	}
}
