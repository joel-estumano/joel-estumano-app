import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from '@shared/components/icon/icon.component';
import { NgClass } from '@angular/common';
import { SwitchComponent } from './switch.component';
import { ThemeService } from '@core/services/theme/theme.service';

describe('SwitchComponent', () => {
	let component: SwitchComponent;
	let fixture: ComponentFixture<SwitchComponent>;
	// serviço
	let mockThemeService: jasmine.SpyObj<ThemeService>;

	beforeEach(async () => {
		// mock do serviço
		mockThemeService = jasmine.createSpyObj(ThemeService.name, ['isTheme', 'update']);
		mockThemeService.isTheme.and.returnValue(true);

		await TestBed.configureTestingModule({
			imports: [SwitchComponent, NgClass, IconComponent],
			providers: [{ provide: ThemeService, useValue: mockThemeService }]
		}).compileComponents();

		fixture = TestBed.createComponent(SwitchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve criar o componente', () => {
		expect(component).toBeTruthy();
	});

	it('deve inicializar o model "checked" com base no tema atual', () => {
		expect(component.checked()).toBeTrue();
		expect(mockThemeService.isTheme).toHaveBeenCalledWith('dark');
	});

	it('não deve alternar o estado se o componente estiver desabilitado', () => {
		fixture.componentRef.setInput('disabled', true);
		const valorInicial = component.checked();
		component.toggleSwitch();
		expect(component.checked()).toBe(valorInicial);
		expect(mockThemeService.update).not.toHaveBeenCalled();
	});

	it('deve alternar o estado e atualizar o tema quando habilitado', () => {
		component.checked.set(false);
		fixture.componentRef.setInput('disabled', false);

		component.toggleSwitch();

		expect(component.checked()).toBeTrue();
		expect(mockThemeService.update).toHaveBeenCalledWith('dark');

		component.toggleSwitch();

		expect(component.checked()).toBeFalse();
		expect(mockThemeService.update).toHaveBeenCalledWith('light');
	});

	it('deve permitir definir ícones via input', () => {
		fixture.componentRef.setInput('iconChecked', 'heroMoonSolid');
		fixture.componentRef.setInput('iconUnchecked', 'heroSunSolid');
		expect(component.iconChecked()).toBe('heroMoonSolid');
		expect(component.iconUnchecked()).toBe('heroSunSolid');
	});
});
