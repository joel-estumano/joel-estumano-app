import { AfterViewInit, Directive, ElementRef, inject, Renderer2 } from "@angular/core";

@Directive({
	standalone: true,
	selector: "[appMagicPointer]"
})
export class MagicPointerDirective implements AfterViewInit {
	protected el = inject(ElementRef);
	protected renderer = inject(Renderer2);

	ngAfterViewInit(): void {
		const pointer: HTMLElement = this.renderer.createElement("div");
		const ring: HTMLElement = this.renderer.createElement("div");

		this.renderer.addClass(pointer, "pointer-dot");
		this.renderer.addClass(ring, "pointer-ring");

		const init = () => {
			if (typeof window !== "undefined") {
				let mouseX = 0,
					mouseY = 0,
					ringX = 0,
					ringY = 0;

				this.renderer.insertBefore(this.el.nativeElement, pointer, null);
				this.renderer.insertBefore(this.el.nativeElement, ring, null);

				window.onmousemove = (mouse: MouseEvent) => {
					mouseX = mouse.clientX;
					mouseY = mouse.clientY;
				};

				const trace = (a: number, b: number, n: number) => (1 - n) * a + n * b;

				const render = () => {
					ringX = trace(ringX, mouseX, 0.2);
					ringY = trace(ringY, mouseY, 0.2);

					pointer.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
					ring.style.transform = `translate(${ringX - 14}px, ${ringY - 14}px)`;

					requestAnimationFrame(render);
				};
				requestAnimationFrame(render);
			}
		};

		init();
	}
}
