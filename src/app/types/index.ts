import { Type } from '@angular/core';
import { IconName } from '@components/icon/icon.component';

export interface IProjectData {
	id: string;
	name: string;
	bannerUrl: string;
	demoUrl: string;
	company: string;
	companyUrl: string;
	resources: string[];
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
	local: 'Remota' | 'Presencial';
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

export interface IPost {
	id: string;
	title?: string;
	description?: string;
	timestamp?: string;
	tags?: string[];
	content?: string;
}

export interface IComponentOutletData<T, D, K extends string = 'data'> {
	component: Type<T>;
	inputs: Record<K, D>;
}
