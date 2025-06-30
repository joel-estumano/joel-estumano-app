import { AvatarComponent } from './avatar.component';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('AvatarComponent', () => {
	let component: AvatarComponent;
	let fixture: ComponentFixture<AvatarComponent>;

	const src = 'test-avatar.webp';
	const alt = 'test avatar';

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AvatarComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(AvatarComponent);

		fixture.componentRef.setInput('src', src);
		fixture.componentRef.setInput('alt', alt);

		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve criar o componente', () => {
		expect(component).toBeTruthy();
	});

	it(`o avatar deve ter o atributo src com valo ${src}`, () => {
		const img = fixture.debugElement.query(By.css('[data-test-id="avatar"]')).nativeElement as HTMLImageElement;
		expect(img.src).toContain(src);
	});

	it(`o avatar deve ter o atributo alt com o valor ${alt}`, () => {
		const img = fixture.debugElement.query(By.css('[data-test-id="avatar"]')).nativeElement as HTMLImageElement;
		expect(img.alt).toBe(alt);
	});
});
