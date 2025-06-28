import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { provideRouter } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ThemeService } from 'src/app/services/theme/theme.service';

describe('NavBarComponent', () => {
	let component: NavBarComponent;
	let fixture: ComponentFixture<NavBarComponent>;
	// serviço
	let localStorageSpy: jasmine.SpyObj<LocalStorageService>;

	beforeEach(async () => {
		// mock do serviço
		localStorageSpy = jasmine.createSpyObj(LocalStorageService.name, ['retrieve', 'store']);

		await TestBed.configureTestingModule({
			imports: [NavBarComponent],
			providers: [provideRouter([]), { provide: LocalStorageService, useValue: localStorageSpy }, ThemeService]
		}).compileComponents();

		fixture = TestBed.createComponent(NavBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve criar o componente', () => {
		expect(component).toBeTruthy();
	});
});
