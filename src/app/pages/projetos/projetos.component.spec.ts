import { ButtonComponent } from '@shared/ui/button/button.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from '@shared/components/icon/icon.component';
import { IProjectData } from '@types';
import { LinkComponent } from '@shared/ui/link/link.component';
import { Location } from '@angular/common';
import { PROFILE } from 'src/app/core/tokens';
import { ProjetosComponent } from './projetos.component';
import { SectionComponent } from '@shared/components/section/section.component';

describe('ProjetosComponent', () => {
	let componente: ProjetosComponent;
	let fixture: ComponentFixture<ProjetosComponent>;
	// serviço
	let locationSpy: jasmine.SpyObj<Location>;

	const projetosMock: IProjectData[] = [{ id: '1', name: 'Projeto 1' } as IProjectData, { id: '2', name: 'Projeto 2' } as IProjectData];

	const perfilMock = {
		projects: projetosMock
	};

	beforeEach(async () => {
		// mock do serviço
		locationSpy = jasmine.createSpyObj(Location.name, ['back']);

		await TestBed.configureTestingModule({
			imports: [ProjetosComponent, SectionComponent, IconComponent, ButtonComponent, LinkComponent],
			providers: [
				{ provide: PROFILE, useValue: perfilMock },
				{ provide: Location, useValue: locationSpy }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(ProjetosComponent);
		componente = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve ser criado', () => {
		expect(componente).toBeTruthy();
	});

	it('deve definir os dados quando um id válido for fornecido', () => {
		componente.id = '1';
		expect(componente['data']()).toEqual(projetosMock[0]);
	});

	it('não deve definir os dados quando um id inválido for fornecido', () => {
		componente['data'].set(null);
		componente.id = 'invalido';
		expect(componente['data']()).toBeNull();
	});

	it('deve chamar location.back() quando goBack() for chamado', () => {
		componente.goBack();
		expect(locationSpy.back).toHaveBeenCalled();
	});
});
