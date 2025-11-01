import { Component, input } from '@angular/core';
import { IconName, IconComponent } from '../icon/icon.component';
import { NgOptimizedImage, NgStyle } from '@angular/common';

@Component({
	selector: 'app-card',
	imports: [NgOptimizedImage, IconComponent, NgStyle],
	templateUrl: './card.component.html',
	styleUrl: './card.component.css'
})
export class CardComponent {
	icon = input<IconName>();
	title = input<string>();
	description = input<string>();
	img = input<string>('img/service-sample-0.jpg');
	highlight = input<string>();
}
