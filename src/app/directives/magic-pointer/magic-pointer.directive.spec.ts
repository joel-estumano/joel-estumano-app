import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { MagicPointerDirective } from "./magic-pointer.directive";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
	template: `<div appMagicPointer><p>Test</p></div>`,
	standalone: true,
	imports: [MagicPointerDirective]
})
class TestHostComponent {}

describe("MagicPointerDirective", () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let debugEl: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestHostComponent]
		});
		fixture = TestBed.createComponent(TestHostComponent);
		debugEl = fixture.debugElement.query(By.directive(MagicPointerDirective));
	});

	it("deve criar o componente an instance", () => {
		expect(debugEl).toBeTruthy();
	});

	it("deve adicionar os elementos pointer-dot e pointer-ring após o ciclo view init", () => {
		fixture.detectChanges();

		const pointer = debugEl.nativeElement.querySelector(".pointer-dot");
		const ring = debugEl.nativeElement.querySelector(".pointer-ring");

		expect(pointer).toBeTruthy();
		expect(ring).toBeTruthy();
	});

	it("deve executar a função render e aplicar transformações", fakeAsync(() => {
		const clientX = 100;
		const clientY = 150;

		fixture.detectChanges();

		const mouseEvent = new MouseEvent("mousemove", {
			clientX: clientX,
			clientY: clientY,
			bubbles: true
		});
		window.dispatchEvent(mouseEvent);

		// Simula a chamada de múltiplos frames
		tick(50);

		const pointer = debugEl.nativeElement.querySelector(".pointer-dot") as HTMLElement;
		const ring = debugEl.nativeElement.querySelector(".pointer-ring") as HTMLElement;

		expect(pointer.style.transform).toContain(`${clientX}px`);
		expect(pointer.style.transform).toContain(`${clientY}px`);
		expect(ring.style.transform).toContain("px");
	}));
});
