import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardProjectComponent } from './card-project.component';
import { IProjectData } from '@types';
import { By } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';
import { provideRouter } from '@angular/router';
import { InjectionToken } from '@angular/core';

describe('CardProjectComponent', () => {
	let component: CardProjectComponent;
	let fixture: ComponentFixture<CardProjectComponent>;

	const data: IProjectData = {
		id: 'name_test',
		name: 'Name Test',
		company: 'Company Test',
		companyUrl: 'company.com',
		resources: ['Angular'],
		bannerUrl: 'banner-url-test',
		demoUrl: 'demo-url-test'
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CardProjectComponent, NgOptimizedImage],
			providers: [
				provideRouter([]),
				{
					provide: 'IMAGE_LOADER',
					useValue: ({ src, width }: { src: string; width: number }) =>
						`https://joel-estumano.github.io/public/img/projects/${src.split('.')[0]}-${width}w.jpg`
				},
				{
					provide: 'IMAGE_CONFIG',
					useValue: { breakpoints: [640, 768, 1024, 1280] }
				}
			]
		}).compileComponents();

		fixture = TestBed.createComponent(CardProjectComponent);
		fixture.componentRef.setInput('data', data);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	// Instanciação
	it('deve criar o componente', () => {
		expect(component).toBeTruthy();
	});

	// Renderização de dados
	it('deve renderizar empresa', () => {
		const p = fixture.debugElement.query(By.css('[data-test-id="company"]')).nativeElement as HTMLParagraphElement;
		expect(p.textContent).toBe(data.company);
	});

	it('deve renderizar o nome do projeto', () => {
		const p = fixture.debugElement.query(By.css('[data-test-id="name"]')).nativeElement as HTMLParagraphElement;
		expect(p.textContent).toBe(data.name);
	});

	it('cada item de recursos deve renderizar um recurso', () => {
		const resourceItems = fixture.debugElement.queryAll(By.css('[data-test-id="resources"] li'));
		expect(resourceItems.length).toBe(data.resources.length);
		resourceItems.forEach((item, index) => {
			expect(item.nativeElement.textContent.trim()).toBe(data.resources[index]);
		});
	});

	// Imagens
	it('a imagem deve ter uma url', () => {
		const img = fixture.debugElement.query(By.css('[data-test-id="image"]')).nativeElement as HTMLImageElement;
		expect(img.src).toContain(data.bannerUrl);
	});

	it('a imagem deve ter o atributo alt com o nome do projeto', () => {
		const img = fixture.debugElement.query(By.css('[data-test-id="image"]')).nativeElement as HTMLImageElement;
		expect(img.alt).toBe(data.name);
	});

	it('deve usar [src] no <img> para projetos com id especial', () => {
		const specialData: IProjectData = { ...data, id: 'brax' };
		fixture.componentRef.setInput('data', specialData);
		fixture.detectChanges();

		const img = fixture.debugElement.query(By.css('[data-test-id="image"]')).nativeElement as HTMLImageElement;
		expect(img.getAttribute('src')).toBe(specialData.bannerUrl);
	});

	// Links e comportamento condicional
	it('deve configurar corretamente o botão de Saiba mais', () => {
		const link = fixture.debugElement.query(By.css('[data-test-id="saiba-mais-link"]'));
		expect(link).toBeTruthy();
		expect(link.attributes['ng-reflect-router-link']).toContain(data.id);
	});

	it('não deve renderizar o link Demo se demoUrl não estiver presente', () => {
		const noDemoData: IProjectData = { ...data, demoUrl: '' };
		fixture.componentRef.setInput('data', noDemoData);
		fixture.detectChanges();

		const link = fixture.debugElement.query(By.css('[data-test-id="demo-link"]'));
		expect(link).toBeNull();
	});

	// href propriedade computada
	it('a propriedade computada href deve retornar a rota correta', () => {
		expect(component.href()).toBe(`projetos/${data.id}`);
	});

	it('deve atualizar href quando a entrada de dados mudar', () => {
		const newData: IProjectData = { ...data, id: 'novo-projeto' };
		fixture.componentRef.setInput('data', newData);
		fixture.detectChanges();
		expect(component.href()).toBe('projetos/novo-projeto');
	});

	// Injeção de tokens personalizados
	it('deve fornecer IMAGE_LOADER e IMAGE_CONFIG', () => {
		const imageLoader = TestBed.inject('IMAGE_LOADER' as unknown as (config: { src: string; width: number }) => string);
		const imageConfig = TestBed.inject('IMAGE_CONFIG' as unknown as InjectionToken<{ breakpoints: number[] }>);

		expect(typeof imageLoader).toBe('function');
		expect(imageConfig.breakpoints).toEqual([640, 768, 1024, 1280]);
	});

	it('IMAGE_LOADER deve gerar URL de imagem correta', () => {
		const imageLoader = TestBed.inject('IMAGE_LOADER' as unknown as (config: { src: string; width: number }) => string);
		const config = { src: 'banner-url-test.jpg', width: 640 };
		const url = imageLoader(config);
		expect(url).toBe('https://joel-estumano.github.io/public/img/projects/banner-url-test-640w.jpg');
	});
});
