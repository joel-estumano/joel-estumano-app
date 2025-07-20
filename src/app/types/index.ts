import { Type } from '@angular/core';
import { IconName } from '@shared/components/icon/icon.component';

export interface IEnvironment {
	production: boolean;
	apiUrl: string;
	recaptchaSiteKey: string;
}

export interface IProjectData {
	id: string;
	name: string;
	bannerUrl: string;
	demoUrl: string;
	company: string;
	companyUrl: string;
	resources: TechnologyName[];
}

export interface IProfileStack {
	name: string;
	docs: string;
	iconName: IconName;
}

export interface IExperience {
	company: string;
	office: string;
	period: string;
	local: 'Remoto' | 'Presencial';
}

export interface IProfileData {
	name: string;
	phone: string;
	email: string;
	whatsapp: string;
	websiteUrl: string;
	linkedinUrl: string;
	githubUrl: string;
	instagramUrl: string;
	profession: string;
	professionStack: string;
	professionLevel: string;
	professionEmphasis: string;
	professionalStart: number;
	address: string;
	city: string;
	stacks: {
		basic: IProfileStack[];
		frontEnd: IProfileStack[];
		backEnd: IProfileStack[];
		others: IProfileStack[];
	};
	experiences: IExperience[];
	projects: IProjectData[];
}

export type Theme = 'dark' | 'light';

export interface IBlogPost {
	_id: string;
	title: string;
	description: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}

export interface IComponentOutletData<T, D, K extends string = 'data'> {
	component: Type<T>;
	inputs: Record<K, D>;
}

export type TechnologyName =
	| 'AdonisJS'
	| 'Angular'
	| 'Bootstrap'
	| 'Bulma CSS'
	| 'CSS'
	| 'CSS3'
	| 'Docker'
	| 'Expo'
	| 'Firebase'
	| 'Flutter'
	| 'Github'
	| 'HTML5'
	| 'IntelliJ IDEA'
	| 'Ionic'
	| 'Java'
	| 'JavaScript'
	| 'Jest'
	| 'Laravel'
	| 'MongoDB'
	| 'MySQL'
	| 'NestJS'
	| 'Next'
	| 'Node.js'
	| 'Postgres'
	| 'Postman'
	| 'React'
	| 'Redis'
	| 'SCSS'
	| 'Spring Boot'
	| 'Swagger'
	| 'Tailwind CSS'
	| 'TypeScript'
	| 'VS Code'
	| 'Vue.js';
