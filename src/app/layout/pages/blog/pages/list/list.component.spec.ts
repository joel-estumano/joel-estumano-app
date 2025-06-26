import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ListComponent } from "./list.component";
import { BlogModule } from "../../blog.module";
import { provideRouter } from "@angular/router";

describe("ListComponent", () => {
	let component: ListComponent;
	let fixture: ComponentFixture<ListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BlogModule],
			providers: [provideRouter([])]
		}).compileComponents();

		fixture = TestBed.createComponent(ListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("deve criar o componente", () => {
		expect(component).toBeTruthy();
	});
});
