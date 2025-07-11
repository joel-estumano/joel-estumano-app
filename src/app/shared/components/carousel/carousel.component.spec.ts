import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';
import { of } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

describe('CarouselComponent', () => {
	let component: CarouselComponent<unknown, unknown>;
	let fixture: ComponentFixture<CarouselComponent<unknown, unknown>>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CarouselComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(CarouselComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve criar o componente', () => {
		expect(component).toBeTruthy();
	});

	// ✅ Computações e sinais
	it('deve calcular movedX corretamente', () => {
		component['startX'] = 100;
		component.movido.set(150);
		expect(component.movedX()).toBe(50);

		component.movido.set(70);
		expect(component.movedX()).toBe(30);
	});

	it('deve calcular translateX corretamente baseado nos sinais', () => {
		component.slideIndexActive.set(2);
		expect(component['translateX']()).toContain('-200%');

		component['isXlscreen'].set(true);
		expect(component['translateX']()).toContain('+ 33%');
	});

	it('deve calcular offset em translateX quando arrastando com hasDragged', () => {
		component.slideIndexActive.set(0);
		component['startX'] = 100;
		component.movido.set(200); // deslocamento de 100px
		component.isDragging.set(true);
		component.hasDragged.set(true);

		const result = component['translateX']();

		// Espera algo como "translateX(calc(0% + 10%))" se window.innerWidth = 1000
		expect(result).toContain('translateX(calc(');
		expect(result).toContain('% +');
	});

	// ✅ Eventos de mouse e toque
	it('deve definir isDragging como true ao chamar onStart()', () => {
		const mouseEvent = new MouseEvent('mousedown', { clientX: 100 });
		component.onStart(mouseEvent);
		expect(component.isDragging()).toBeTrue();
	});

	it('deve definir isDragging como false ao chamar onEnd()', () => {
		const mouseEvent = new MouseEvent('mouseup', { clientX: 100 });
		component.hasDragged.set(true);
		component.onEnd(mouseEvent);
		expect(component.isDragging()).toBeFalse();
	});

	it('deve atualizar movido ao chamar onMouseMove()', () => {
		component.isDragging.set(true);
		const event = new MouseEvent('mousemove', { clientX: 123 });
		component.onMouseMove(event);
		expect(component.movido()).toBe(123);
	});

	it('não deve atualizar movido se não estiver arrastando', () => {
		component.isDragging.set(false); // simula que não está arrastando
		component.movido.set(0); // valor inicial

		const event = new MouseEvent('mousemove', { clientX: 123 });
		component.onMouseMove(event);

		// O valor não deve ter mudado
		expect(component.movido()).toBe(0);
	});

	it('deve processar evento de toque em onMouseMove', () => {
		component.isDragging.set(true); // necessário para permitir o movimento

		const touchEvent = {
			touches: [{ clientX: 150 }]
		} as unknown as TouchEvent;

		component.onMouseMove(touchEvent);

		expect(component.movido()).toBe(150);
	});

	it('deve lidar com evento de toque em onStart e onEnd', () => {
		const touchStart = { touches: [{ clientX: 123 }] } as unknown as TouchEvent;
		component.onStart(touchStart);
		expect(component.isDragging()).toBeTrue();
		expect(component['startX']).toBe(123);

		// Simula que estamos no segundo slide
		component.slideIndexActive.set(1);

		const touchEnd = { changedTouches: [{ clientX: 180 }] } as unknown as TouchEvent;
		spyOn(component, 'prev');
		component.threshold = 50;
		component.hasDragged.set(true);
		component.onEnd(touchEnd);

		expect(component.isDragging()).toBeFalse();
		expect(component.prev).toHaveBeenCalled();
	});

	// ✅ Navegação
	it('deve definir slideIndexActive com o índice selecionado ao chamar select()', () => {
		fixture.componentRef.setInput('slides', [{ component: null, data: null }]);
		component.select(0);
		expect(component.slideIndexActive()).toBe(0);
	});

	it('deve ir para o próximo slide ao chamar next()', () => {
		fixture.componentRef.setInput('slides', [
			{ component: null, data: null },
			{ component: null, data: null }
		]);
		component.slideIndexActive.set(0);
		component.next();
		expect(component.slideIndexActive()).toBe(1);
	});

	it('deve voltar ao primeiro slide se next() for chamado no último slide', () => {
		fixture.componentRef.setInput('slides', [
			{ component: null, data: null },
			{ component: null, data: null }
		]);
		component.slideIndexActive.set(1);
		component.next();
		expect(component.slideIndexActive()).toBe(0);
	});

	it('deve ir para o slide anterior ao chamar prev()', () => {
		fixture.componentRef.setInput('slides', [
			{ component: null, data: null },
			{ component: null, data: null }
		]);
		component.slideIndexActive.set(1);
		component.prev();
		expect(component.slideIndexActive()).toBe(0);
	});

	it('não deve ir abaixo de 0 ao chamar prev() no primeiro slide', () => {
		fixture.componentRef.setInput('slides', [
			{ component: null, data: null },
			{ component: null, data: null }
		]);
		component.slideIndexActive.set(0);
		component.prev();
		expect(component.slideIndexActive()).toBe(0);
	});

	// ✅ Auto-scroll
	it('deve chamar next() após 30 segundos se autoScroll estiver ativo', fakeAsync(() => {
		component['autoScroll'].set(true);
		spyOn(component, 'next');
		component['startAutoScroll']();
		tick(30000);
		expect(component.next).toHaveBeenCalled();
	}));

	it('deve atualizar autoScroll ao chamar updateAutoScroll()', () => {
		component.updateAutoScroll(false);
		expect(component['autoScroll']()).toBeFalse();
		component.updateAutoScroll(true);
		expect(component['autoScroll']()).toBeTrue();
	});

	it('deve reiniciar o scroll automático ao chamar updateAutoScroll()', () => {
		spyOn(component as unknown as { startAutoScroll: () => void }, 'startAutoScroll');
		component.updateAutoScroll(true);
		expect((component as unknown as { startAutoScroll: jasmine.Spy }).startAutoScroll).toHaveBeenCalled();
	});

	// ✅ Condições de navegação por arraste
	it('deve chamar prev() ao arrastar para a direita além do threshold', () => {
		spyOn(CarouselComponent.prototype, 'prev');

		component.slideIndexActive.set(1);
		component.threshold = 50;
		component['startX'] = 100;
		component.movido.set(200);
		component.hasDragged.set(true);
		component.isDragging.set(true);

		const endEvent = new MouseEvent('mouseup', { clientX: 200 });
		component.onEnd(endEvent);

		expect(CarouselComponent.prototype.prev).toHaveBeenCalled();
	});

	it('deve chamar next() ao arrastar para a esquerda além do threshold', () => {
		spyOn(component, 'next');

		// Simula dois slides
		fixture.componentRef.setInput('slides', [
			{ component: null, data: null },
			{ component: null, data: null }
		]);

		component.slideIndexActive.set(0); // no primeiro slide
		component.threshold = 50;

		// Simula o gesto
		component['startX'] = 200;
		component.movido.set(100); // deslocamento de -100
		component.hasDragged.set(true);
		component.isDragging.set(true);

		const endEvent = new MouseEvent('mouseup', { clientX: 100 });
		component.onEnd(endEvent);

		expect(component.next).toHaveBeenCalled();
	});

	it('não deve chamar next() nem prev() se o arraste for menor que o threshold', () => {
		spyOn(component, 'next');
		spyOn(component, 'prev');
		component['startX'] = 100;
		component.hasDragged.set(true);
		const mouseEvent = new MouseEvent('mouseup', { clientX: 120 });
		component.threshold = 50;
		component.onEnd(mouseEvent);
		expect(component.next).not.toHaveBeenCalled();
		expect(component.prev).not.toHaveBeenCalled();
	});

	it('não deve navegar se hasDragged for false', () => {
		spyOn(component, 'next');
		spyOn(component, 'prev');
		component['startX'] = 100;
		component.hasDragged.set(false);
		const mouseEvent = new MouseEvent('mouseup', { clientX: 200 });
		component.threshold = 50;
		component.onEnd(mouseEvent);
		expect(component.next).not.toHaveBeenCalled();
		expect(component.prev).not.toHaveBeenCalled();
	});
});

// ✅ Teste separado com injeção customizada de BreakpointObserver
describe('CarouselComponent com Breakpoint simulado', () => {
	it('deve atualizar isXlscreen ao inicializar com breakpoint ativo', async () => {
		const mockBreakpoint = {
			observe: jasmine.createSpy().and.returnValue(of({ matches: true }))
		};

		await TestBed.configureTestingModule({
			imports: [CarouselComponent],
			providers: [{ provide: BreakpointObserver, useValue: mockBreakpoint }]
		}).compileComponents();

		const newFixture = TestBed.createComponent(CarouselComponent);
		const newComponent = newFixture.componentInstance;
		newFixture.detectChanges();

		expect(newComponent['isXlscreen']()).toBeTrue();
	});
});
