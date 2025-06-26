import { Pipe, PipeTransform } from '@angular/core';
import { IProfileData } from '@types';

@Pipe({
	name: 'copyrightText'
})
export class CopyrightTextPipe implements PipeTransform {
	transform(profile: IProfileData): string {
		if (!profile || !profile.name || !profile.professionalStart) return '';

		const currentYear = new Date().getFullYear();
		return profile.professionalStart === currentYear
			? `${profile.name} © ${currentYear}`
			: `${profile.name} © ${profile.professionalStart}-${currentYear}`;
	}
}
