import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IComponentOutletData } from '@types';

@Component({
	selector: 'app-infinite-carousel',
	imports: [CommonModule],
	templateUrl: './infinite-carousel.component.html',
	styleUrl: './infinite-carousel.component.css'
})
export class InfiniteCarouselComponent<T, D> {
	@Input() direction: 'top' | 'bottom' = 'top';
	@Input({ required: true }) children!: IComponentOutletData<T, D, 'icon'>[];
}
