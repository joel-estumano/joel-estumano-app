import { CardProjectComponent } from '@shared/components/card-project/card-project.component';
import { CarouselComponent } from '@shared/components/carousel/carousel.component';
import { Component, computed, Inject, signal } from '@angular/core';
import { FloatingButtonComponent } from '@shared/components/floating-button/floating-button.component';
import { IComponentOutletData, IProfileData, IProfileStack, IProjectData } from '@types';
import { IconComponent, IconName } from '@shared/components/icon/icon.component';
import { LinkComponent } from '@shared/ui/link/link.component';
import { PROFILE } from 'src/app/core/tokens';
import { RouterLink } from '@angular/router';
import { RouterLinkComponent } from '@shared/ui/router-link/router-link.component';
import { SectionComponent } from '@shared/components/section/section.component';

@Component({
	selector: 'app-home',
	imports: [CarouselComponent, FloatingButtonComponent, IconComponent, LinkComponent, RouterLink, RouterLinkComponent, SectionComponent],
	templateUrl: './home.component.html'
})
export class HomeComponent {
	protected links: { href: string; title: string; icon: IconName }[] = [];

	protected services: { title: string; description: string; icon: IconName }[] = [
		{
			title: 'Websites',
			description: 'Criação de sites personalizados para você ou seu negócio.',
			icon: 'heroComputerDesktop'
		},
		{
			title: 'Sistemas Web',
			description: 'Desenvolvimento de dashboards, CRMs e plataformas web sob medida para o seu negócio.',
			icon: 'heroGlobeAmericasSolid'
		},
		{
			title: 'Aplicativos',
			description: 'Criação de aplicativos móveis para Android e iOS',
			icon: 'heroDevicePhoneMobile'
		}
	];

	protected projects = signal<IComponentOutletData<CardProjectComponent, IProjectData>[]>([]);

	protected stacks = signal<IProfileStack[]>([]);

	protected professionTime = computed(() => new Date().getFullYear() - this.profile.professionalStart);

	constructor(@Inject(PROFILE) protected readonly profile: IProfileData) {
		this.stacks.set([...this.profile.stacks.basic, ...this.profile.stacks.frontEnd, ...this.profile.stacks.backEnd, ...this.profile.stacks.others]);

		this.links = [
			{
				href: this.profile.githubUrl,
				title: 'Github',
				icon: 'bootstrapGithub'
			},
			{
				href: this.profile.instagramUrl,
				title: 'Instagram',
				icon: 'bootstrapInstagram'
			}
		];

		this.projects.set(
			this.profile.projects.map((fw: IProjectData) => {
				return {
					component: CardProjectComponent,
					inputs: {
						data: fw
					}
				};
			})
		);
	}
}
