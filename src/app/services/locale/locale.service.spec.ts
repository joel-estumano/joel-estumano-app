import { TestBed } from '@angular/core/testing';
import { LOCALE_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LocaleService } from './locale.service';

describe('LocaleService', () => {
	let service: LocaleService;
	let mockRenderer: jasmine.SpyObj<Renderer2>;
	let mockRendererFactory: jasmine.SpyObj<RendererFactory2>;
	let mockDocument: Document;

	beforeEach(() => {
		// Cria mocks
		mockRenderer = jasmine.createSpyObj(Renderer2.name, ['setAttribute']);
		mockRendererFactory = jasmine.createSpyObj(RendererFactory2.name, ['createRenderer']);
		mockRendererFactory.createRenderer.and.returnValue(mockRenderer);

		// Documento fictício com documentElement
		mockDocument = {
			documentElement: document.createElement('html')
		} as unknown as Document;

		TestBed.configureTestingModule({
			providers: [
				LocaleService,
				{ provide: LOCALE_ID, useValue: 'en-US' },
				{ provide: DOCUMENT, useValue: mockDocument },
				{ provide: RendererFactory2, useValue: mockRendererFactory }
			]
		});

		service = TestBed.inject(LocaleService);
	});

	it('deve ser criado', () => {
		expect(service).toBeTruthy();
	});

	it('deve atualizar o locale e definir atributo lang no documento', () => {
		service.setLocale('pt-BR');
		expect(mockRenderer.setAttribute).toHaveBeenCalledWith(mockDocument.documentElement, 'lang', 'pt-BR');
	});
});
