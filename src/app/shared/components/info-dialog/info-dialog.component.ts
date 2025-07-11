import { Component, input } from '@angular/core';

export interface InfoDialogData {
	title: string;
	subTitle: string;
	content: string;
}

@Component({
	selector: 'app-info-dialog',
	templateUrl: './info-dialog.component.html'
})
export class InfoDialogComponent {
	data = input<InfoDialogData>();
}
