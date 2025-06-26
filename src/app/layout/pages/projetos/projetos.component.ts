import { Location } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { SectionComponent } from '@components/section/section.component';
import { IProjectData } from '@types';
import { PROFILE } from 'src/app/tokens';
import { IconComponent } from '@components/icon/icon.component';
import { ButtonComponent } from '@components/ui/button/button.component';
import { LinkComponent } from '@components/ui/link/link.component';

@Component({
	selector: 'app-projetos',
	imports: [SectionComponent, IconComponent, ButtonComponent, LinkComponent],
	templateUrl: './projetos.component.html'
})
export class ProjetosComponent {
	protected profile = inject(PROFILE);
	data = signal<IProjectData | null>(null);

	@Input()
	set id(id: string) {
		const data = this.profile.projects.find((p) => p.id === id);
		if (data) {
			this.data.set(data);
		}
	}

	constructor(private location: Location) {}

	goBack(): void {
		this.location.back();
	}
}
