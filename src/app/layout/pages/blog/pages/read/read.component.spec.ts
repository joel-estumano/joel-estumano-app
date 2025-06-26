import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ReadComponent } from './read.component';
import { BlogModule } from '../../blog.module';

describe('ReadComponent', () => {
	let component: ReadComponent;
	let fixture: ComponentFixture<ReadComponent>;
	// serviço
	let locationSpy: jasmine.SpyObj<Location>;

	beforeEach(async () => {
		// mock do serviço
		locationSpy = jasmine.createSpyObj(Location.name, ['back']);

		await TestBed.configureTestingModule({
			imports: [BlogModule],
			providers: [{ provide: Location, useValue: locationSpy }]
		}).compileComponents();

		fixture = TestBed.createComponent(ReadComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve criar o componente', () => {
		expect(component).toBeTruthy();
	});

	it('deve chamar location.back() quando goBack() for chamado', () => {
		component.goBack();
		expect(locationSpy.back).toHaveBeenCalled();
	});
});
