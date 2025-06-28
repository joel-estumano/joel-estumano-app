import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterLinkComponent } from './router-link.component';
import { provideRouter, RouterLink, RouterLinkActive } from '@angular/router';

describe('RouterLinkComponent', () => {
	let component: RouterLinkComponent;
	let fixture: ComponentFixture<RouterLinkComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterLinkComponent, RouterLink, RouterLinkActive],
			providers: [provideRouter([])]
		}).compileComponents();

		fixture = TestBed.createComponent(RouterLinkComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve criar o componente', () => {
		expect(component).toBeTruthy();
	});
});
