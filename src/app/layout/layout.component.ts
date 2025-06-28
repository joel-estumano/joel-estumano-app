import { Component, inject } from '@angular/core';
import { CopyrightTextPipe } from '../pipes/copyright-text/copyright-text.pipe';
import { IconComponent, IconName } from '@components/icon/icon.component';
import { LinkComponent } from '@components/ui/link/link.component';
import { NavBarComponent } from '@components/nav-bar/nav-bar.component';
import { PROFILE } from '../tokens';
import { RouterOutlet } from '@angular/router';
import { MagicPointerDirective } from '../directives/magic-pointer/magic-pointer.directive';

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
