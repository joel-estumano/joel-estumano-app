import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DrawerComponent } from './drawer.component';
import { ElementRef, Renderer2 } from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';
import { NgClass } from '@angular/common';
import { WINDOW } from 'src/app/core/tokens';

describe('DrawerComponent', () => {
	let component: DrawerComponent;
	let fixture: ComponentFixture<DrawerComponent>;
	let mockWindow: { innerWidth: number }; // Janela simulada para teste responsivo
	let renderer: Renderer2;

	beforeEach(async () => {
		// Define a largura da janela simulada
		mockWindow = { innerWidth: 500 };

		await TestBed.configureTestingModule({
			imports: [DrawerComponent, NgClass, IconComponent],
			providers: [{ provide: WINDOW, useValue: mockWindow }]
		}).compileComponents();

		// Cria uma instância do componente
		fixture = TestBed.createComponent(DrawerComponent);
		component = fixture.componentInstance;

		// Obtém o Renderer2 para manipulação do DOM
		renderer = fixture.componentRef.injector.get(Renderer2);
		fixture.detectChanges();

		// Cria um drawer fictício para os testes
		component.drawer = {
			nativeElement: document.createElement('div')
		} as never;
	});

	// Verifica se o componente foi criado corretamente
	it('deve criar o componente', () => {
		expect(component).toBeTruthy();
	});

	// Testa se o menuTranslateX é inicializado corretamente
	it('deve inicializar menuTranslateX no ngOnInit', () => {
		component.menuTranslateX = 0;
		component.ngOnInit();
		expect(component.menuTranslateX).toBe(-mockWindow.innerWidth);
	});

	// Testa se o drawer é ocultado após inicialização da view
	it('deve ocultar o drawer no ngAfterViewInit', () => {
		spyOn(renderer, 'setStyle');
		component.drawer = {
			nativeElement: document.createElement('div')
		} as never;
		component.ngAfterViewInit();
		expect(renderer.setStyle).toHaveBeenCalledWith(component.drawer.nativeElement, 'display', 'none');
	});

	// Testa se abrir/fechar o drawer funciona corretamente
	it('deve alternar entre abrir e fechar o drawer', fakeAsync(() => {
		spyOn(renderer, 'setStyle');
		spyOn(component.changed, 'emit');

		component.open = false;
		component.toggleDrawer();
		expect(renderer.setStyle).toHaveBeenCalledWith(component.drawer.nativeElement, 'display', 'block');
		tick(10);
		expect(component.menuTranslateX).toBe(0);
		expect(component.open).toBeTrue();
		expect(component.changed.emit).toHaveBeenCalledWith(true);

		component.toggleDrawer();
		expect(component.menuTranslateX).toBe(-mockWindow.innerWidth);
		tick(300);
		expect(renderer.setStyle).toHaveBeenCalledWith(component.drawer.nativeElement, 'display', 'none');
		expect(component.open).toBeFalse();
		expect(component.changed.emit).toHaveBeenCalledWith(false);
	}));

	// Testa início do toque no componente (gesto)
	it('deve lidar com onTouchStart', () => {
		const event = { touches: [{ clientX: 100 }] } as unknown as TouchEvent;
		component.onTouchStart(event);
		expect(component.touchStartX).toBe(100);
		expect(component.onTouchMoveActive).toBeTrue();
	});

	// Testa o movimento do toque com drawer aberto
	it('deve lidar com onTouchMove quando aberto', () => {
		spyOn(component.changed, 'emit');
		component.open = true;
		component.touchStartX = 200;
		const event = { touches: [{ clientX: 150 }] } as unknown as TouchEvent;
		component.onTouchMove(event);
		expect(component.menuTranslateX).toBe(-50);
		expect(component.changed.emit).toHaveBeenCalledWith(true);
	});

	// Testa o movimento do toque com drawer fechado
	it('deve calcular menuTranslateX corretamente quando menu estiver fechado', () => {
		spyOn(component.changed, 'emit');
		component.open = false;
		component.touchStartX = 200;

		const event = { touches: [{ clientX: 100 }] } as unknown as TouchEvent;

		component.onTouchMove(event);

		const esperado = -mockWindow.innerWidth + Math.max(100, 0);
		expect(component.menuTranslateX).toBe(esperado);
		expect(component.changed.emit).toHaveBeenCalledWith(false);
	});

	// Testa final do toque para fechar o drawer
	it('deve lidar com onTouchEnd para fechar o drawer', fakeAsync(() => {
		spyOn(renderer, 'setStyle');
		spyOn(component.changed, 'emit');

		component.menuTranslateX = -300; // mais que 41% da largura
		component.open = true;
		component.onTouchEnd();

		expect(component.open).toBeFalse();
		expect(component.menuTranslateX).toBe(-mockWindow.innerWidth);
		tick(300);
		expect(renderer.setStyle).toHaveBeenCalledWith(component.drawer.nativeElement, 'display', 'none');
		expect(component.onTouchMoveActive).toBeFalse();
		expect(component.changed.emit).toHaveBeenCalledWith(false);
	}));

	// Testa final do toque para abrir o drawer
	it('deve lidar com onTouchEnd para abrir o drawer', fakeAsync(() => {
		spyOn(renderer, 'setStyle');
		spyOn(component.changed, 'emit');

		component.menuTranslateX = -100; // menos que 41% da largura
		component.open = false;
		component.onTouchEnd();

		expect(component.open).toBeTrue();
		expect(component.menuTranslateX).toBe(0);
		tick(10);
		expect(renderer.setStyle).toHaveBeenCalledWith(component.drawer.nativeElement, 'display', 'block');
		expect(component.onTouchMoveActive).toBeFalse();
		expect(component.changed.emit).toHaveBeenCalledWith(true);
	}));

	// Testa se os listeners são removidos na destruição do componente
	it('deve remover os ouvintes de evento no ngOnDestroy', () => {
		const drawerEl = document.createElement('div');
		component.drawer = { nativeElement: drawerEl } as ElementRef<HTMLDivElement>;

		spyOn(drawerEl, 'removeEventListener');

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		component.touchStartHandler = () => {};
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		component.touchMoveHandler = () => {};
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		component.touchEndHandler = () => {};
		component.ngOnDestroy();

		expect(drawerEl.removeEventListener).toHaveBeenCalledWith('touchstart', component.touchStartHandler);
		expect(drawerEl.removeEventListener).toHaveBeenCalledWith('touchmove', component.touchMoveHandler);
		expect(drawerEl.removeEventListener).toHaveBeenCalledWith('touchend', component.touchEndHandler);
	});
});
