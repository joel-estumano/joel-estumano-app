import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorPageComponent } from './error-page.component';
import { Location } from '@angular/common';
import { provideRouter } from '@angular/router';

describe('ErrorPageComponent', () => {
	let component: ErrorPageComponent;
	let fixture: ComponentFixture<ErrorPageComponent>;
	// serviço
	let locationSpy: jasmine.SpyObj<Location>;
	const statusTestValue = '500';

	beforeEach(async () => {
		// mock do serviço
		locationSpy = jasmine.createSpyObj(Location.name, ['back']);

		await TestBed.configureTestingModule({
			imports: [ErrorPageComponent],
			providers: [provideRouter([]), { provide: Location, useValue: locationSpy }]
		}).compileComponents();

		fixture = TestBed.createComponent(ErrorPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve criar o componente', () => {
		expect(component).toBeTruthy();
	});

	it(`deve exibir o código de status do erro: ${statusTestValue}`, () => {
		component.status.set(statusTestValue);
		fixture.detectChanges();

		const p = fixture.debugElement.query(By.css('[data-test-id="status"]')).nativeElement as HTMLParagraphElement;
		expect(p.textContent).toBe(statusTestValue.toString());
	});

	it('deve chamar location.back() quando goBack() for chamado', () => {
		component.goBack();
		expect(locationSpy.back).toHaveBeenCalled();
	});
});
