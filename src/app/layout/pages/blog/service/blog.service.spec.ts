import { BlogService } from './blog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '@core/services/http/http.service';
import { IBlogPost } from '@types';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('BlogService', () => {
	let service: BlogService;
	let httpServiceSpy: jasmine.SpyObj<HttpService>;

	beforeEach(() => {
		const spy = jasmine.createSpyObj('HttpService', ['get']);

		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [BlogService, { provide: HttpService, useValue: spy }]
		});

		service = TestBed.inject(BlogService);
		httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
	});

	it('deve ser criado', () => {
		expect(service).toBeTruthy();
	});

	it('deve retornar um post pelo id', () => {
		const postId = 'abc123';
		const mockPost: IBlogPost = {
			_id: postId,
			title: 'Título de Teste',
			description: 'Descrição de Teste',
			content: 'Conteúdo de Teste',
			createdAt: '2023-01-01T00:00:00Z',
			updatedAt: '2023-01-02T00:00:00Z'
		};

		httpServiceSpy.get.and.returnValue(of(mockPost));

		service.read(postId).subscribe((post) => {
			expect(post).toEqual(mockPost);
			expect(httpServiceSpy.get).toHaveBeenCalledWith(`blog-posts/${postId}`);
		});
	});

	it('deve retornar uma lista de posts', () => {
		const mockPosts: IBlogPost[] = [
			{
				_id: '1',
				title: 'Post 1',
				description: 'Descrição 1',
				content: 'Conteúdo 1',
				createdAt: '2023-01-01T00:00:00Z',
				updatedAt: '2023-01-01T01:00:00Z'
			},
			{
				_id: '2',
				title: 'Post 2',
				description: 'Descrição 2',
				content: 'Conteúdo 2',
				createdAt: '2023-01-02T00:00:00Z',
				updatedAt: '2023-01-02T01:00:00Z'
			}
		];

		httpServiceSpy.get.and.returnValue(of(mockPosts));

		service.list().subscribe((posts) => {
			expect(posts).toEqual(mockPosts);
			expect(posts.length).toBe(2);
			expect(httpServiceSpy.get).toHaveBeenCalledWith('blog-posts');
		});
	});
});
