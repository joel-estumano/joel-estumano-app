import { CardProjectComponent } from '@components/card-project/card-project.component';
import { CarouselComponent } from '@components/carousel/carousel.component';
import { Component, computed, Inject, signal } from '@angular/core';
import { IconComponent, IconName } from '@components/icon/icon.component';
import { IComponentOutletData, IProfileData, IProfileStack, IProjectData } from '@types';
import { PROFILE } from 'src/app/tokens';
import { RouterLink } from '@angular/router';
import { SectionComponent } from '@components/section/section.component';
import { LinkComponent } from '@components/ui/link/link.component';
import { RouterLinkComponent } from '@components/ui/router-link/router-link.component';

@Component({
	selector: 'app-home',
	imports: [SectionComponent, IconComponent, CarouselComponent, RouterLink, LinkComponent, RouterLinkComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent {
	protected links: { href: string; title: string; icon: IconName }[] = [];

	protected abouts: { title: string; description: string; icon: IconName }[] = [
		{
			title: 'Desenvolvimento web',
			description:
				'“Desenvolvo aplicações completas, responsivas, acessíveis e de alto desempenho, construídas com tecnologias modernas e foco na qualidade.”',
			icon: 'heroCodeBracket'
		},
		{
			title: 'Análise e Estratégia',
			description: '“Atuo na identificação e entendimento de demandas técnicas ou de negócio, analisando necessidades e propondo soluções eficientes.”',
			icon: 'boxLineChart'
		},
		{
			title: 'Cultura de Aprendizado',
			description:
				'“Contribuo com o desenvolvimento de pessoas por meio de orientação técnica, troca de experiências e apoio no processo de aprendizado.”',
			icon: 'heroBookOpen'
		}
	];

	protected projects = signal<IComponentOutletData<CardProjectComponent, IProjectData>[]>([]);

	protected stacks = signal<IProfileStack[]>([]);

	protected professionTime = computed(() => new Date().getFullYear() - this.profile.professionalStart);

	constructor(@Inject(PROFILE) protected profile: IProfileData) {
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
