import { BlogService } from '../../service/blog.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IBlogPost } from '@types';
import { ListComponent } from './list.component';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('ListComponent', () => {
	let component: ListComponent;
	let fixture: ComponentFixture<ListComponent>;

	// serviço
	let mockBlogServiceSpy: jasmine.SpyObj<BlogService>;

	const mockPosts: IBlogPost[] = [
		{
			_id: 'test-id-1',
			title: 'Test Post 1',
			content: 'Test Content 1',
			description: 'Test description',
			createdAt: '2025-06-02T22:47:37.710+00:00',
			updatedAt: '2025-06-02T22:47:37.710+00:00'
		},
		{
			_id: 'test-id-2',
			title: 'Test Post 2',
			content: 'Test Content 2',
			description: 'Test description',
			createdAt: '2025-06-02T22:47:37.710+00:00',
			updatedAt: '2025-06-02T22:47:37.710+00:00'
		}
	];

	beforeEach(async () => {
		// mock do serviço
		mockBlogServiceSpy = jasmine.createSpyObj(BlogService.name, ['list']);

		await TestBed.configureTestingModule({
			declarations: [ListComponent],
			providers: [{ provide: BlogService, useValue: mockBlogServiceSpy }, provideRouter([])],
			schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ignora elementos desconhecidos no template
		}).compileComponents();

		mockBlogServiceSpy.list.and.returnValue(of(mockPosts));

		fixture = TestBed.createComponent(ListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve criar o componente', () => {
		expect(component).toBeTruthy();
	});

	it('deve chamar blogService.list() ao inicializar', () => {
		expect(mockBlogServiceSpy.list).toHaveBeenCalled();
	});

	it('deve atribuir blogPosts$ com os dados retornados pelo serviço', (done) => {
		component.blogPosts$.subscribe((posts) => {
			expect(posts).toEqual(mockPosts);
			done();
		});
	});
});
