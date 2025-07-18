import { Component, computed, input } from '@angular/core';
import { IMAGE_CONFIG, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { IProjectData } from '@types';
import { LinkComponent } from '@shared/ui/link/link.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import { RouterLinkComponent } from '@shared/ui/router-link/router-link.component';
import { TechnologyColorDirective } from '@shared/directives/technology-color/technology-color.directive';

@Component({
	selector: 'app-card-project',
	imports: [NgOptimizedImage, LinkComponent, IconComponent, RouterLinkComponent, TechnologyColorDirective],
	providers: [
		{
			provide: IMAGE_LOADER,
			useValue: (config: ImageLoaderConfig) => {
				const srcArray = config.src.split('.');
				const name = srcArray[0];
				const format = srcArray[1];
				return `https://joel-estumano.github.io/public/img/projects/${name}-${config.width}w.${format}`;
			}
		},
		{
			provide: IMAGE_CONFIG,
			useValue: {
				breakpoints: [640, 768, 1024, 1280]
			}
		}
	],
	templateUrl: './card-project.component.html'
})
export class CardProjectComponent {
	data = input.required<IProjectData>();

	href = computed(() => {
		return `projetos/${this.data().id}`;
	});
}
