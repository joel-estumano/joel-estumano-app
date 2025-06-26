import { TestBed } from "@angular/core/testing";
import { RootDialogModule } from "./root-dialog.module";
import { RootDialogService } from "./service/root-dialog.service";

describe("RootDialogModule with forRoot", () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RootDialogModule.forRoot()]
		});
	});

	it("deve injetar RootDialogService", () => {
		const service = TestBed.inject(RootDialogService);
		expect(service).toBeTruthy();
	});
});
