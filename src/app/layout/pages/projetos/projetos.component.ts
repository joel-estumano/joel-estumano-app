import { ButtonComponent } from '@shared/ui/button/button.component';
import { Component, inject, Input, signal } from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';
import { IProjectData } from '@types';
import { LinkComponent } from '@shared/ui/link/link.component';
import { Location } from '@angular/common';
import { PROFILE } from 'src/app/core/tokens';
import { SectionComponent } from '../../components/section/section.component';

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
