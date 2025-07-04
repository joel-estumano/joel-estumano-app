import { ButtonComponent } from '@shared/ui/button/button.component';
import { Component, signal } from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLinkComponent } from '@shared/ui/router-link/router-link.component';
import { SectionComponent } from '../../components/section/section.component';

@Component({
	selector: 'app-error-page',
	standalone: true,
	imports: [SectionComponent, ButtonComponent, IconComponent, RouterLinkComponent],
	templateUrl: './error-page.component.html'
})
export class ErrorPageComponent {
	status = signal<string>('');

	constructor(
		private router: Router,
		private location: Location
	) {
		const nav = this.router.getCurrentNavigation();
		this.status.set(nav?.extras?.state?.['status']);
	}

	goBack(): void {
		this.location.back();
	}
}
