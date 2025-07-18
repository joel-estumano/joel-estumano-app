import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
	let component: LoaderComponent;
	let fixture: ComponentFixture<LoaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LoaderComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(LoaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve criar o componente', () => {
		expect(component).toBeTruthy();
	});
});
