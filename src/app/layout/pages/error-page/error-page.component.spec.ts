import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorPageComponent } from './error-page.component';

describe('ErrorPageComponent', () => {
	let component: ErrorPageComponent;
	let fixture: ComponentFixture<ErrorPageComponent>;

	const statusTestValue = '500';

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ErrorPageComponent]
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
});
