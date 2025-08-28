import { Component, inject, Renderer2 } from '@angular/core';
import { CopyrightTextPipe } from '@shared/pipes/copyright-text/copyright-text.pipe';
import { DOCUMENT } from '@angular/common';
import { IconComponent, IconName } from '@shared/components/icon/icon.component';
import { LinkComponent } from '@shared/ui/link/link.component';
import { LocaleService } from '@core/services/locale/locale.service';
import { Meta } from '@angular/platform-browser';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { PROFILE } from './core/tokens';
import { RootDialogModule } from '@shared/modules/root-dialog/root-dialog.module';
import { RouterOutlet } from '@angular/router';
import { Theme } from '@types';
import { ThemeService } from '@core/services/theme/theme.service';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, RootDialogModule, CopyrightTextPipe, IconComponent, NavBarComponent, LinkComponent],
	templateUrl: './app.component.html'
})
export class AppComponent {
	protected profile = inject(PROFILE);
	private document = inject(DOCUMENT);

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

	constructor(
		private localeService: LocaleService,
		private meta: Meta,
		private themeService: ThemeService,
		private renderer: Renderer2
	) {
		this.themeService.change().subscribe((value: Theme) => {
			this.renderer.removeClass(this.document.body, value === 'dark' ? 'light' : 'dark');
			this.renderer.addClass(this.document.body, value);
		});

		this.localeService.setLocale('pt-BR');
		this.meta.addTags([
			{
				name: 'author',
				content: `${this.profile.name}`
			},
			{
				name: 'contato',
				content: `${this.profile.websiteUrl}/contato`
			},
			{
				name: 'description',
				content: `${this.profile.professionEmphasis}.`
			},
			{
				name: 'keywords',
				content: `${this.profile.name}, estumano, ${this.profile.profession}, ${this.profile.phone}, Aplicativos, Catálogos digitais, Landing pages, SEO, Sistemas web, Sites profissionais, ${this.profile.stacks.basic.map((b) => b.name).join(', ')}, ${this.profile.stacks.frontEnd.map((s) => s.name).join(', ')}, ${this.profile.projects.map((p) => p.name).join(', ')}`
			},
			{
				property: 'og:url',
				content: `${this.profile.websiteUrl}`
			},
			{
				property: 'og:title',
				content: `${this.profile.name} ${this.profile.profession}`
			},
			{
				property: 'og:description',
				content: this.profile.profession
			},
			{
				property: 'og:image',
				content: 'https://www.joelestumano.com/banner-joelestumano.png'
			},
			{
				property: 'og:type',
				content: 'website'
			},
			{
				property: 'og:site_name',
				content: `${this.profile.name}`
			},
			{
				property: 'og:locale',
				content: 'pt_BR'
			}
		]);
	}
}
