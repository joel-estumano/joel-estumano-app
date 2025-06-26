import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfiniteCarouselComponent } from './infinite-carousel.component';

describe('InfiniteCarouselComponent', () => {
	let component: InfiniteCarouselComponent<unknown, unknown>;
	let fixture: ComponentFixture<InfiniteCarouselComponent<unknown, unknown>>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [InfiniteCarouselComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(InfiniteCarouselComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve criar o componente', () => {
		expect(component).toBeTruthy();
	});
});
