import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InfoComponent, InfoData } from "./info.component";
import { By } from "@angular/platform-browser";

describe("InfoComponent", () => {
	let fixture: ComponentFixture<InfoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [InfoComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(InfoComponent);
		fixture = TestBed.createComponent(InfoComponent);
	});
	it("deve renderizar o título, subtítulo e conteúdo corretamente", () => {
		const mockData: InfoData = {
			title: "Título de Teste",
			subTitle: "Subtítulo de Teste",
			content: "Conteúdo de Teste"
		};

		// Atribui o dado ao input
		fixture.componentRef.setInput("data", mockData);
		fixture.detectChanges();

		const titleEl = fixture.debugElement.query(By.css('[data-test-id="title"]')).nativeElement;
		const subTitleEl = fixture.debugElement.query(By.css('[data-test-id="subTitle"]')).nativeElement;
		const contentEl = fixture.debugElement.query(By.css('[data-test-id="content"]')).nativeElement;

		expect(titleEl.textContent).toContain(mockData.title);
		expect(subTitleEl.textContent).toContain(mockData.subTitle);
		expect(contentEl.textContent).toContain(mockData.content);
	});
});
