import { Component, ElementRef, inject, input, OnInit, Renderer2, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { IconComponent } from '@components/icon/icon.component';
import { output } from '@angular/core';
import { NgClass } from '@angular/common';
import { WINDOW } from 'src/app/tokens';

@Component({
	selector: 'app-drawer',
	templateUrl: './drawer.component.html',
	imports: [NgClass, IconComponent]
})
export class DrawerComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('drawer') drawer!: ElementRef<HTMLDivElement>;

	private window = inject(WINDOW);
	private renderer = inject(Renderer2);

	touchStartHandler!: (e: TouchEvent) => void;
	touchMoveHandler!: (e: TouchEvent) => void;
	touchEndHandler!: (e: TouchEvent) => void;

	class = input<string>('');
	changed = output<boolean>();

	open = false;

	menuTranslateX = -this.window.innerWidth;
	touchStartX = 0;
	onTouchMoveActive = false;

	ngOnInit(): void {
		this.menuTranslateX = -this.window.innerWidth;
	}

	ngAfterViewInit(): void {
		this.renderer.setStyle(this.drawer.nativeElement, 'display', 'none');

		const drawerEl = this.drawer.nativeElement;

		drawerEl.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: true });
		drawerEl.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true });
		drawerEl.addEventListener('touchend', this.onTouchEnd.bind(this), { passive: true });

		drawerEl.addEventListener('touchstart', this.touchStartHandler, { passive: true });
		drawerEl.addEventListener('touchmove', this.touchMoveHandler, { passive: true });
		drawerEl.addEventListener('touchend', this.touchEndHandler, { passive: true });
	}

	ngOnDestroy(): void {
		const drawerEl = this.drawer.nativeElement;
		drawerEl.removeEventListener('touchstart', this.touchStartHandler);
		drawerEl.removeEventListener('touchmove', this.touchMoveHandler);
		drawerEl.removeEventListener('touchend', this.touchEndHandler);
	}

	toggleDrawer(): void {
		if (this.open) {
			this.menuTranslateX = -this.window.innerWidth;
			setTimeout(() => {
				this.renderer.setStyle(this.drawer.nativeElement, 'display', 'none');
			}, 300);
		} else {
			this.renderer.setStyle(this.drawer.nativeElement, 'display', 'block');
			setTimeout(() => {
				this.menuTranslateX = 0;
			}, 10);
		}
		this.open = !this.open;
		this.changed.emit(this.open);
	}

	onTouchStart(event: TouchEvent): void {
		this.touchStartX = event.touches[0].clientX;
		this.onTouchMoveActive = true;
	}

	onTouchMove(event: TouchEvent): void {
		const touchCurrentX = event.touches[0].clientX;
		const touchMoveX = this.touchStartX - touchCurrentX;
		if (touchMoveX > 0) {
			if (this.open) {
				this.menuTranslateX = -Math.min(touchMoveX, this.window.innerWidth);
			} else {
				this.menuTranslateX = -this.window.innerWidth + Math.max(touchMoveX, 0);
			}
		}
		this.changed.emit(this.open);
	}

	onTouchEnd(): void {
		if (this.menuTranslateX <= -this.window.innerWidth * 0.4167) {
			this.open = false;
			this.menuTranslateX = -this.window.innerWidth;
			setTimeout(() => {
				this.renderer.setStyle(this.drawer.nativeElement, 'display', 'none');
			}, 300);
		} else {
			this.open = true;
			this.menuTranslateX = 0;
			setTimeout(() => {
				this.renderer.setStyle(this.drawer.nativeElement, 'display', 'block');
			}, 10);
		}
		this.onTouchMoveActive = false;
		this.changed.emit(this.open);
	}
}
