import { BreakpointObserver } from '@angular/cdk/layout';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { afterNextRender, Component, computed, inject, input, NgZone, OnInit, signal } from '@angular/core';
import { IconComponent } from '@components/icon/icon.component';
import { IComponentOutletData } from '@types';
import { WINDOW } from 'src/app/tokens';

@Component({
	selector: 'app-carousel',
	imports: [NgComponentOutlet, NgClass, IconComponent],
	templateUrl: './carousel.component.html'
})
export class CarouselComponent<T, D> implements OnInit {
	slides = input<IComponentOutletData<T, D>[]>([]);

	slideIndexActive = signal<number>(0);

	private autoScroll = signal<boolean>(true);

	private intervalId!: number | ReturnType<typeof setTimeout>;

	private isXlscreen = signal<boolean>(false);

	protected translateX = computed<string>(() => `translateX(calc(-${this.slideIndexActive() * 100}%${this.isXlscreen() ? ' + 33%' : ' + 0%'}))`);

	private window = inject(WINDOW);

	isDragging = signal<boolean>(false);

	constructor(
		private breakpointObserver: BreakpointObserver,
		private ngZone: NgZone
	) {
		afterNextRender(() => {
			this.startAutoScroll();
		});
	}

	ngOnInit(): void {
		this.breakpointObserver.observe(['(min-width: 1280px)']).subscribe((result) => {
			this.isXlscreen.set(result.matches);
		});
	}

	private startAutoScroll(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
		if (this.autoScroll()) {
			this.intervalId = setInterval(() => {
				this.ngZone.run(() => {
					this.next();
				});
			}, 30000);
		}
	}

	select(index: number): void {
		this.slideIndexActive.set(index);
		this.startAutoScroll();
	}

	prev(): void {
		if (this.slideIndexActive() === 0) {
			// this.slideIndexActive.set(this.slides().length - 1);
		} else {
			this.slideIndexActive.set(this.slideIndexActive() - 1);
		}
		this.startAutoScroll();
	}

	next(): void {
		if (this.slideIndexActive() === this.slides().length - 1) {
			this.slideIndexActive.set(0);
		} else {
			this.slideIndexActive.set(this.slideIndexActive() + 1);
		}
		this.startAutoScroll();
	}

	updateAutoScroll(auto: boolean): void {
		this.autoScroll.set(auto);
		this.startAutoScroll();
	}

	private startX = 0;
	movido = signal<number>(0);

	threshold = (this.window.innerWidth * 2) / 100; // 2% da largura da tela

	movedX = computed((): number => {
		if (this.movido() > this.startX) {
			return this.movido() - this.startX;
		} else {
			return this.startX - this.movido();
		}
	});

	onMouseMove(event: MouseEvent) {
		this.movido.set(event.clientX);
	}

	onStart(event: MouseEvent | TouchEvent): void {
		this.isDragging.set(true);

		if ('touches' in event && event.touches.length) {
			this.startX = event.touches[0].clientX;
		} else if ('clientX' in event) {
			this.startX = event.clientX;
		}
	}

	onEnd(event: MouseEvent | TouchEvent): void {
		this.isDragging.set(false);

		let endX = 0;

		if ('changedTouches' in event && event.changedTouches.length) {
			endX = event.changedTouches[0].clientX;
		} else if ('clientX' in event) {
			endX = event.clientX;
		}

		const distanceMovedX = endX - this.startX;

		if (distanceMovedX > this.threshold) {
			this.prev();
		} else if (distanceMovedX < -this.threshold) {
			if (this.slideIndexActive() < this.slides().length - 1) {
				this.next();
			}
		}
	}
}
