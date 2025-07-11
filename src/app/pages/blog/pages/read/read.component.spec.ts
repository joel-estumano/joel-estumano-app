import { BlogService } from '../../service/blog.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IBlogPost } from '@types';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { ReadComponent } from './read.component';

describe('ReadComponent', () => {
	let component: ReadComponent;
	let fixture: ComponentFixture<ReadComponent>;

	// serviço
	let locationSpy: jasmine.SpyObj<Location>;
	let blogServiceSpy: jasmine.SpyObj<BlogService>;

	const mockPost: IBlogPost = {
		_id: 'test-id',
		title: 'Test Title',
		content: 'Test Content',
		description: 'Test Description',
		createdAt: '2025-06-02T22:47:37.710+00:00',
		updatedAt: '2025-06-02T22:47:37.710+00:00'
	};

	beforeEach(async () => {
		// mock do serviço
		locationSpy = jasmine.createSpyObj(Location.name, ['back']);
		blogServiceSpy = jasmine.createSpyObj(BlogService.name, ['read']);

		await TestBed.configureTestingModule({
			declarations: [ReadComponent],
			providers: [
				{ provide: Location, useValue: locationSpy },
				{ provide: BlogService, useValue: blogServiceSpy }
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();

		blogServiceSpy.read.and.returnValue(of(mockPost));

		fixture = TestBed.createComponent(ReadComponent);
		component = fixture.componentInstance;
	});

	it('deve criar o componente', () => {
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	it('deve chamar location.back() quando goBack() for chamado', () => {
		component.goBack();
		expect(locationSpy.back).toHaveBeenCalled();
	});

	it('deve chamar blogService.read() e atribuir blogPost$ ao definir id', (done) => {
		component.id = 'test-id';
		expect(blogServiceSpy.read).toHaveBeenCalledWith(mockPost._id);

		component.blogPost$.subscribe((post) => {
			expect(post).toEqual(mockPost);
			done();
		});
	});
});
