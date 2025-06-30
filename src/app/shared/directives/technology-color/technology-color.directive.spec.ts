import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnologyColorDirective } from './technology-color.directive';
import { By } from '@angular/platform-browser';

@Component({
	template: `<span appTechnologyColor [technology]="testValue">Tech</span>`,
	standalone: true,
	imports: [TechnologyColorDirective]
})
class TestHostComponent {
	testValue = '';
}

describe('TechnologyColorDirective', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let debugEl: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestHostComponent]
		});
		fixture = TestBed.createComponent(TestHostComponent);
		debugEl = fixture.debugElement.query(By.directive(TechnologyColorDirective));
	});

	it('deve criar a instância da diretiva', () => {
		expect(debugEl).toBeTruthy();
	});

	it('deve aplicar classes corretas para "Angular"', () => {
		fixture.componentInstance.testValue = 'Angular';
		fixture.detectChanges();
		const el = debugEl.nativeElement;
		expect(el.classList.contains('bg-red-600/20')).toBeTrue();
		expect(el.classList.contains('text-red-600')).toBeTrue();
	});

	it('deve aplicar classes corretas para "React"', () => {
		fixture.componentInstance.testValue = 'React';
		fixture.detectChanges();
		const el = debugEl.nativeElement;
		expect(el.classList.contains('bg-cyan-500/20')).toBeTrue();
		expect(el.classList.contains('text-cyan-500')).toBeTrue();
	});

	it('deve aplicar classes padrão para tecnologia desconhecida', () => {
		fixture.componentInstance.testValue = 'UnknownTech';
		fixture.detectChanges();
		const el = debugEl.nativeElement;
		expect(el.classList.contains('bg-gray-300/20')).toBeTrue();
		expect(el.classList.contains('text-gray-500')).toBeTrue();
	});

	it('deve aplicar classes padrão para string vazia', () => {
		fixture.componentInstance.testValue = '';
		fixture.detectChanges();
		const el = debugEl.nativeElement;
		expect(el.classList.contains('bg-gray-300/20')).toBeTrue();
		expect(el.classList.contains('text-gray-500')).toBeTrue();
	});

	it('deve atualizar as classes quando o valor muda', () => {
		fixture.componentInstance.testValue = 'Vue.js';
		fixture.detectChanges();
		const el = debugEl.nativeElement;
		expect(el.classList.contains('bg-emerald-500/20')).toBeTrue();
		expect(el.classList.contains('text-emerald-500')).toBeTrue();

		fixture.componentInstance.testValue = 'Tailwind CSS';
		fixture.detectChanges();
		expect(el.classList.contains('bg-sky-400/20')).toBeTrue();
		expect(el.classList.contains('text-sky-500')).toBeTrue();
	});
});
