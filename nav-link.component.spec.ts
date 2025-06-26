// import { By } from '@angular/platform-browser';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NavLinkComponent } from './nav-link.component';
// import { provideRouter, RouterLink, RouterLinkActive } from '@angular/router';

// describe('NavLinkComponent', () => {
// 	let component: NavLinkComponent;
// 	let fixture: ComponentFixture<NavLinkComponent>;

// 	const href = '#';
// 	const title = 'title';
// 	const text = 'text';

// 	beforeEach(async () => {
// 		await TestBed.configureTestingModule({
// 			imports: [NavLinkComponent, RouterLink, RouterLinkActive],
// 			providers: [provideRouter([])]
// 		}).compileComponents();

// 		fixture = TestBed.createComponent(NavLinkComponent);

// 		fixture.componentRef.setInput('href', href);
// 		fixture.componentRef.setInput('title', title);
// 		fixture.componentRef.setInput('text', text);

// 		component = fixture.componentInstance;
// 		fixture.detectChanges();
// 	});

// 	it('deve criar o componente', () => {
// 		expect(component).toBeTruthy();
// 	});

// 	it('deve ter a propriedade `href` definida como input', () => {
// 		const hasInput = Object.prototype.hasOwnProperty.call(component, 'href');
// 		expect(hasInput).toBeTrue();
// 	});

// 	it('deve ter a propriedade `target` definida como input', () => {
// 		const hasInput = Object.prototype.hasOwnProperty.call(component, 'target');
// 		expect(hasInput).toBeTrue();
// 	});

// 	it('deve ter a propriedade `title` definida como input', () => {
// 		const hasInput = Object.prototype.hasOwnProperty.call(component, 'title');
// 		expect(hasInput).toBeTrue();
// 	});

// 	it('deve ter a propriedade `text` definida como input', () => {
// 		const hasInput = Object.prototype.hasOwnProperty.call(component, 'text');
// 		expect(hasInput).toBeTrue();
// 	});

// 	it('deve renderizar o texto (' + text + ') do link', () => {
// 		const linkElement = fixture.debugElement.query(By.css('[data-test-id="link"]')).nativeElement as HTMLLinkElement;
// 		expect(linkElement.outerText).toBe(text);
// 	});

// 	it('deve renderizar o atributo (' + title + ') title', () => {
// 		const linkElement = fixture.debugElement.query(By.css('[data-test-id="link"]')).nativeElement as HTMLLinkElement;
// 		expect(linkElement.title).toBe(title);
// 	});

// 	it('deve ter a propriedade `iconStart` definida como input', () => {
// 		const hasInput = Object.prototype.hasOwnProperty.call(component, 'iconStart');
// 		expect(hasInput).toBeTrue();
// 	});

// 	it('deve ter a propriedade `iconEnd` definida como input', () => {
// 		const hasInput = Object.prototype.hasOwnProperty.call(component, 'iconEnd');
// 		expect(hasInput).toBeTrue();
// 	});

// 	// it('deve emitir o evento onClick quando o link é clicado', () => {
// 	// 	// Espionar o método de emissão do evento
// 	// 	spyOn(component.onClick, 'emit');

// 	// 	// Obter o elemento <a> do template
// 	// 	const linkElement = fixture.debugElement.query(By.css('[data-test-id="link"]')).nativeElement as HTMLLinkElement;

// 	// 	// Simular o clique no elemento <a>
// 	// 	linkElement.click();

// 	// 	// Verificar se o evento foi emitido
// 	// 	expect(component.onClick.emit).toHaveBeenCalled();
// 	// });
// });
