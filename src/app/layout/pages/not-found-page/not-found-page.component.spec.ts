import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundPageComponent } from './not-found-page.component';

describe('NotFoundPageComponent', () => {
	let component: NotFoundPageComponent;
	let fixture: ComponentFixture<NotFoundPageComponent>;

	const statusTestValue = '404';

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NotFoundPageComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(NotFoundPageComponent);
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
