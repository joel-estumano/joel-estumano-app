import { BreakpointObserver } from '@angular/cdk/layout';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { afterNextRender, Component, computed, inject, input, NgZone, OnInit, signal } from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';
import { IComponentOutletData } from '@types';
import { WINDOW } from 'src/app/core/tokens';

@Component({
	selector: 'app-carousel',
	imports: [NgComponentOutlet, NgClass, IconComponent],
	templateUrl: './carousel.component.html'
})
export class CarouselComponent<T, D> implements OnInit {
	// 📥 Entrada de slides dinâmicos
	slides = input<IComponentOutletData<T, D>[]>([]);

	// 📦 Injeções
	private window = inject(WINDOW);

	constructor(
		private breakpointObserver: BreakpointObserver,
		private ngZone: NgZone
	) {
		// Inicia o auto-scroll após o primeiro render
		afterNextRender(() => {
			this.startAutoScroll();
		});
	}

	// 📊 Estado do carrossel
	slideIndexActive = signal<number>(0);
	autoScroll = signal<boolean>(true);
	isDragging = signal<boolean>(false);
	hasDragged = signal<boolean>(false);
	movido = signal<number>(0);
	isXlscreen = signal<boolean>(false);

	// 📐 Cálculo do deslocamento durante o arraste
	dragOffset = computed(() => this.movido() - this.startX);

	// 📐 Cálculo da posição de translação do carrossel
	protected translateX = computed<string>(() => {
		const base = -this.slideIndexActive() * 100;
		const offset = this.isDragging() && this.hasDragged() ? (this.dragOffset() / this.window.innerWidth) * 100 : 0;
		const extra = this.isXlscreen() ? 33 : 0;
		return `translateX(calc(${base + offset}% + ${extra}%))`;
	});

	// 📐 Cálculo auxiliar (não usado diretamente, mas disponível)
	movedX = computed(() => Math.abs(this.movido() - this.startX));

	// 📏 Limiar mínimo para considerar um swipe (2% da largura da tela)
	threshold = (this.window.innerWidth * 2) / 100;

	// 🔁 Lifecycle hook
	ngOnInit(): void {
		this.breakpointObserver.observe(['(min-width: 1280px)']).subscribe((result) => {
			this.isXlscreen.set(result.matches);
		});
	}

	// 🔁 Navega para um slide específico
	select(index: number): void {
		this.slideIndexActive.set(index);
		this.startAutoScroll();
	}

	// ⬅️ Navega para o slide anterior
	prev(): void {
		if (this.slideIndexActive() > 0) {
			this.slideIndexActive.set(this.slideIndexActive() - 1);
		}
		this.startAutoScroll();
	}

	// ➡️ Navega para o próximo slide
	next(): void {
		if (this.slideIndexActive() < this.slides().length - 1) {
			this.slideIndexActive.set(this.slideIndexActive() + 1);
		} else {
			this.slideIndexActive.set(0); // loop opcional
		}
		this.startAutoScroll();
	}

	// 🔄 Atualiza o estado de auto-scroll
	updateAutoScroll(auto: boolean): void {
		this.autoScroll.set(auto);
		this.startAutoScroll();
	}

	// ⚙️ Inicia o auto-scroll com intervalo
	private intervalId!: number | ReturnType<typeof setTimeout>;
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

	// 🧷 Referências para remover listeners globais
	private onMouseMoveBound = this.onMouseMove.bind(this);
	private onEndBound = this.onEnd.bind(this);

	// 🖱️ Evento de início de arraste
	private startX = 0;
	onStart(event: MouseEvent | TouchEvent): void {
		this.isDragging.set(true);
		this.hasDragged.set(false);

		if ('touches' in event && event.touches.length) {
			this.startX = event.touches[0].clientX;
			this.movido.set(this.startX);
			document.addEventListener('touchmove', this.onMouseMoveBound);
			document.addEventListener('touchend', this.onEndBound);
		} else if ('clientX' in event) {
			this.startX = event.clientX;
			this.movido.set(this.startX);
			document.addEventListener('mousemove', this.onMouseMoveBound);
			document.addEventListener('mouseup', this.onEndBound);
		}
	}

	// 🖱️ Evento de movimento durante arraste
	onMouseMove(event: MouseEvent | TouchEvent): void {
		if (!this.isDragging()) return;

		let currentX = 0;
		if ('touches' in event && event.touches.length) {
			currentX = event.touches[0].clientX;
		} else if ('clientX' in event) {
			currentX = event.clientX;
		}

		this.movido.set(currentX);

		if (Math.abs(currentX - this.startX) > 5) {
			this.hasDragged.set(true);
		}
	}

	// 🖱️ Evento de fim de arraste
	onEnd(event: MouseEvent | TouchEvent): void {
		this.isDragging.set(false);

		// Remove listeners globais
		document.removeEventListener('mousemove', this.onMouseMoveBound);
		document.removeEventListener('mouseup', this.onEndBound);
		document.removeEventListener('touchmove', this.onMouseMoveBound);
		document.removeEventListener('touchend', this.onEndBound);

		let endX = 0;
		if ('changedTouches' in event && event.changedTouches.length) {
			endX = event.changedTouches[0].clientX;
		} else if ('clientX' in event) {
			endX = event.clientX;
		}

		const distanceMovedX = endX - this.startX;

		if (!this.hasDragged()) return;

		if (distanceMovedX > this.threshold && this.slideIndexActive() > 0) {
			this.prev();
		} else if (distanceMovedX < -this.threshold && this.slideIndexActive() < this.slides().length - 1) {
			this.next();
		}

		this.hasDragged.set(false);
		this.startAutoScroll();
	}
}
