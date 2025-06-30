import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { inject, input, Renderer2, signal } from '@angular/core';
import { RootDialogComponent, WINDOW } from './root-dialog.component';
import { RootDialogService } from '../service/root-dialog.service';
import { of } from 'rxjs';
import { RootDialogModule } from '../root-dialog.module';
import { Component } from '@angular/core';

@Component({
	selector: 'app-mock-dialog',
	template: '<p>Mock Dialog</p>',
	// eslint-disable-next-line @angular-eslint/prefer-standalone
	standalone: false
})
class MockDialogComponent {
	data = input<unknown>();
}

describe('RootDialogComponent', () => {
	let component: RootDialogComponent<unknown, unknown>;
	let fixture: ComponentFixture<RootDialogComponent<unknown, unknown>>;

	// serviço
	let mockService: jasmine.SpyObj<RootDialogService<unknown, unknown>>;
	let mockRenderer: jasmine.SpyObj<Renderer2>;
	let mockWindow: { innerWidth: number };

	beforeEach(() => {
		// mock do serviço
		mockService = jasmine.createSpyObj(RootDialogService.name, ['observable', 'remove']);
		mockRenderer = jasmine.createSpyObj(Renderer2.name, ['setStyle', 'addClass', 'removeClass']);

		spyOnProperty(document.documentElement, 'clientWidth', 'get').and.returnValue(500);
		mockWindow = { innerWidth: 515 };

		TestBed.configureTestingModule({
			imports: [RootDialogModule],
			declarations: [MockDialogComponent],
			providers: [
				{ provide: RootDialogService, useValue: mockService },
				{ provide: Renderer2, useValue: mockRenderer },
				{ provide: Window, useValue: mockWindow }
			]
		});

		mockService.observable.and.returnValue(of([]));
		fixture = TestBed.createComponent(RootDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve criar o componente', () => {
		expect(component).toBeTruthy();
	});

	describe('WINDOW InjectionToken', () => {
		it('deve usar o factory do InjectionToken', () => {
			const result = TestBed.runInInjectionContext(() => inject(WINDOW));
			expect(result).toBeDefined();
		});
	});

	it('deve popular dialogs quando o serviço emitir', () => {
		const incomingDialogs = [
			{
				component: MockDialogComponent,
				inputs: { data: {} },
				state: undefined
			}
		];

		mockService.observable.and.returnValue(of(incomingDialogs));

		fixture = TestBed.createComponent(RootDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		expect(component.dialogs()).toEqual(incomingDialogs);
	});

	it('deve chamar service.remove quando close() for chamado', () => {
		component.dialogs.set([
			{
				component: MockDialogComponent,
				inputs: { data: {} },
				state: {
					open: signal(true),
					isVisible: signal(true),
					isActive: signal(false)
				}
			}
		]);
		component.close(0);
		expect(mockService.remove).toHaveBeenCalledWith(0);
	});

	it('não deve chamar service.remove se o diálogo não tiver state', () => {
		component.dialogs.set([
			{
				component: MockDialogComponent,
				inputs: { data: {} },
				state: undefined
			}
		]);
		component.close(0);
		expect(mockService.remove).not.toHaveBeenCalled();
	});

	it('deve inicializar state se não estiver definido', fakeAsync(() => {
		const dialogWithoutState = {
			component: MockDialogComponent,
			inputs: { data: {} },
			state: undefined
		};

		mockService.observable.and.returnValue(of([dialogWithoutState]));
		fixture = TestBed.createComponent(RootDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		tick();

		const dialog = component.dialogs()[0];
		expect(dialog.state).toBeDefined();
		expect(dialog.state?.open()).toBeTrue();
		expect(dialog.state?.isVisible()).toBeTrue();

		// simula o microtask
		queueMicrotask(() => {
			expect(dialog.state?.isActive()).toBeTrue();
		});
	}));

	it('deve definir o estilo e classe corretamente quando há diálogos', () => {
		const expectedScrollbar = `${component['window'].innerWidth - document.documentElement.clientWidth}px`;

		spyOn(component['renderer'], 'setStyle');
		spyOn(component['renderer'], 'addClass');

		component.handlerScroll(true);

		expect(component['renderer'].setStyle).toHaveBeenCalledWith(document.body, '--scrollbar', expectedScrollbar, jasmine.any(Number));
		expect(component['renderer'].setStyle).toHaveBeenCalledWith(document.body, 'overflow', 'hidden');
		expect(component['renderer'].addClass).toHaveBeenCalledWith(document.body, 'on-dialog');
	});

	it('deve remover o estilo e classe corretamente quando não há diálogos', () => {
		const expectedScrollbar = `${component['window'].innerWidth - document.documentElement.clientWidth}px`;

		spyOn(component['renderer'], 'setStyle');
		spyOn(component['renderer'], 'removeClass');

		component.handlerScroll(false);

		expect(component['renderer'].setStyle).toHaveBeenCalledWith(document.body, '--scrollbar', expectedScrollbar, jasmine.any(Number));
		expect(component['renderer'].setStyle).toHaveBeenCalledWith(document.body, 'overflow', '');
		expect(component['renderer'].removeClass).toHaveBeenCalledWith(document.body, 'on-dialog');
	});
});
