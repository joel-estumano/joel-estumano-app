import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { By } from '@angular/platform-browser';

describe('IconComponent', () => {
	let fixture: ComponentFixture<IconComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [IconComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(IconComponent);
	});

	it('deve criar o componente', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});

	it('deve renderizar ng-icon com os inputs fornecidos', () => {
		const mockIcon = 'alarm'; // nome de ícone válido do ng-icons (exemplo)
		const mockClass = 'text-blue-500';

		fixture.componentRef.setInput('icon', mockIcon);
		fixture.componentRef.setInput('class', mockClass);
		fixture.detectChanges();

		const ngIconEl = fixture.debugElement.query(By.css('[data-test-id="icon"]'));
		expect(ngIconEl).toBeTruthy();
		expect(ngIconEl.attributes['ng-reflect-name']).toBe(mockIcon);
		expect(ngIconEl.attributes['class']).toContain(mockClass);
	});
});
