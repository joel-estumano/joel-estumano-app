import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AlphabetColorDirective } from "./alphabet-color.directive";
import { By } from "@angular/platform-browser";

@Component({
	template: `<span appAlphabetColor [alphabetColor]="testValue">Test</span>`,
	standalone: true,
	imports: [AlphabetColorDirective]
})
class TestHostComponent {
	testValue = "";
}

describe("AlphabetColorDirective", () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let debugEl: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestHostComponent]
		});
		fixture = TestBed.createComponent(TestHostComponent);
		debugEl = fixture.debugElement.query(By.directive(AlphabetColorDirective));
	});

	it("deve criar o componente an instance", () => {
		expect(debugEl).toBeTruthy();
	});

	it('should apply correct classes for letter "a"', () => {
		fixture.componentInstance.testValue = "apple";
		fixture.detectChanges();
		const el = debugEl.nativeElement;
		expect(el.classList.contains("bg-pink-500/20")).toBeTrue();
		expect(el.classList.contains("text-pink-500")).toBeTrue();
	});

	it('should apply correct classes for letter "Z" (case-insensitive)', () => {
		fixture.componentInstance.testValue = "Zebra";
		fixture.detectChanges();
		const el = debugEl.nativeElement;
		expect(el.classList.contains("bg-red-600/20")).toBeTrue();
		expect(el.classList.contains("text-red-600")).toBeTrue();
	});

	it("should apply default classes for non-alphabetic character", () => {
		fixture.componentInstance.testValue = "1test";
		fixture.detectChanges();
		const el = debugEl.nativeElement;
		expect(el.classList.contains("bg-gray-500/20")).toBeTrue();
		expect(el.classList.contains("text-gray-500")).toBeTrue();
	});

	it("should apply default classes for empty string", () => {
		fixture.componentInstance.testValue = "";
		fixture.detectChanges();
		const el = debugEl.nativeElement;
		expect(el.classList.contains("bg-gray-500/20")).toBeTrue();
		expect(el.classList.contains("text-gray-500")).toBeTrue();
	});

	it("should update classes when input changes", () => {
		fixture.componentInstance.testValue = "banana";
		fixture.detectChanges();
		const el = debugEl.nativeElement;
		expect(el.classList.contains("bg-red-500/20")).toBeTrue();
		expect(el.classList.contains("text-red-500")).toBeTrue();

		fixture.componentInstance.testValue = "carrot";
		fixture.detectChanges();
		expect(el.classList.contains("bg-orange-500/20")).toBeTrue();
		expect(el.classList.contains("text-orange-500")).toBeTrue();
	});
});
