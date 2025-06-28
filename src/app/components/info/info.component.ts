import { Component, input } from '@angular/core';

export interface InfoData {
	title: string;
	subTitle: string;
	content: string;
}

@Component({
	selector: 'app-info',
	templateUrl: './info.component.html'
})
export class InfoComponent {
	data = input<InfoData>();
}
