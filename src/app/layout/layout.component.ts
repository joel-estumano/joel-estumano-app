import { Component, inject } from '@angular/core';
import { IconName } from '@shared/components/icon/icon.component';
import { PROFILE } from '@core/tokens';

@Component({
	selector: 'app-layout',
	standalone: false,
	templateUrl: './layout.component.html'
})
export class LayoutComponent {
	protected profile = inject(PROFILE);

	protected links = [
		{
			href: this.profile.githubUrl,
			title: 'Github',
			icon: 'bootstrapGithub' as IconName
		},
		{
			href: this.profile.linkedinUrl,
			title: 'LinkedIn',
			icon: 'bootstrapLinkedin' as IconName
		},
		{
			href: this.profile.instagramUrl,
			title: 'Instagram',
			icon: 'bootstrapInstagram' as IconName
		}
	];
}
