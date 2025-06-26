import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SectionComponent } from "./section.component";

describe("SectionComponent", () => {
	let component: SectionComponent;
	let fixture: ComponentFixture<SectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SectionComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(SectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("deve criar o componente", () => {
		expect(component).toBeTruthy();
	});

	it("deve ter a propriedade `full` definida como input", () => {
		const hasInput = Object.prototype.hasOwnProperty.call(component, "full");
		expect(hasInput).toBeTrue();
	});

	it("deve ter a propriedade `class` definida como input", () => {
		const hasInput = Object.prototype.hasOwnProperty.call(component, "class");
		expect(hasInput).toBeTrue();
	});

	it("deve ter a propriedade `mergeClass` definida como computed", () => {
		const hasComputed = Object.prototype.hasOwnProperty.call(component, "mergeClass");
		expect(hasComputed).toBeTrue();
	});
});
