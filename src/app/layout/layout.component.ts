import { Component, inject } from '@angular/core';
import { CopyrightTextPipe } from '@shared/pipes/copyright-text/copyright-text.pipe';
import { IconComponent, IconName } from '@shared/components/icon/icon.component';
import { LinkComponent } from '@shared/ui/link/link.component';
import { MagicPointerDirective } from '@shared/directives/magic-pointer/magic-pointer.directive';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PROFILE } from '../core/tokens';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-layout',
	imports: [RouterOutlet, CopyrightTextPipe, IconComponent, NavBarComponent, LinkComponent, MagicPointerDirective],
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
