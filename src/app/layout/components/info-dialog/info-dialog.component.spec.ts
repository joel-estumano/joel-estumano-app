import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoDialogComponent, InfoDialogData } from './info-dialog.component';
import { By } from '@angular/platform-browser';

describe('InfoDialogComponent', () => {
	let fixture: ComponentFixture<InfoDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [InfoDialogComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(InfoDialogComponent);
		fixture = TestBed.createComponent(InfoDialogComponent);
	});
	it('deve renderizar o título, subtítulo e conteúdo corretamente', () => {
		const mockData: InfoDialogData = {
			title: 'Título de Teste',
			subTitle: 'Subtítulo de Teste',
			content: 'Conteúdo de Teste'
		};

		// Atribui o dado ao input
		fixture.componentRef.setInput('data', mockData);
		fixture.detectChanges();

		const titleEl = fixture.debugElement.query(By.css('[data-test-id="title"]')).nativeElement;
		const subTitleEl = fixture.debugElement.query(By.css('[data-test-id="subTitle"]')).nativeElement;
		const contentEl = fixture.debugElement.query(By.css('[data-test-id="content"]')).nativeElement;

		expect(titleEl.textContent).toContain(mockData.title);
		expect(subTitleEl.textContent).toContain(mockData.subTitle);
		expect(contentEl.textContent).toContain(mockData.content);
	});
});
