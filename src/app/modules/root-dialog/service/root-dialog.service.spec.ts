import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { RootDialogService, IDialogComponentOutletData } from "./root-dialog.service";

class MockComponent {}

interface MockData {
	message: string;
}

describe("RootDialogService", () => {
	let service: RootDialogService<MockComponent, MockData>;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RootDialogService<MockComponent, MockData>);
	});

	it("deve ser criado corretamente", () => {
		expect(service).toBeTruthy();
	});

	it("deve lançar um novo diálogo", (done) => {
		const dialogMock: IDialogComponentOutletData<MockComponent, MockData> = {
			component: MockComponent,
			inputs: { data: { message: "Olá!" } }
		};

		service.launch(dialogMock);
		service.observable().subscribe((dialogs) => {
			expect(dialogs.length).toBe(1);
			expect(dialogs[0]).toEqual(dialogMock);
			done();
		});
	});

	it("deve retornar o número correto de diálogos", () => {
		expect(service.dialogsLength).toBe(0);

		const dialogMock: IDialogComponentOutletData<MockComponent, MockData> = {
			component: MockComponent,
			inputs: { data: { message: "Contador" } }
		};

		service.launch(dialogMock);
		expect(service.dialogsLength).toBe(1);
	});

	it("deve remover diálogo com estado corretamente", fakeAsync(() => {
		const stateMock = {
			open: { set: jasmine.createSpy("open.set") },
			isActive: { set: jasmine.createSpy("isActive.set") },
			isVisible: { set: jasmine.createSpy("isVisible.set") }
		};

		const dialogMock: IDialogComponentOutletData<MockComponent, MockData> = {
			component: MockComponent,
			inputs: { data: { message: "Remover" } },
			state: stateMock
		};

		service.launch(dialogMock);
		tick();

		service.remove(0);
		tick(150);

		const dialogs = service["dialogsSubject"].value;
		expect(dialogs.length).toBe(0);
		expect(stateMock.open.set).toHaveBeenCalledWith(false);
		expect(stateMock.isActive.set).toHaveBeenCalledWith(false);
		expect(stateMock.isVisible.set).toHaveBeenCalledWith(false);
	}));

	it("deve ignorar remoção com índice inválido", fakeAsync(() => {
		const dialogMock: IDialogComponentOutletData<MockComponent, MockData> = {
			component: MockComponent,
			inputs: { data: { message: "Teste" } }
		};

		service.launch(dialogMock);
		tick();

		expect(() => service.remove(-1)).not.toThrow();
		expect(() => service.remove(100)).not.toThrow();
		tick(150);

		const dialogs = service["dialogsSubject"].value;
		expect(dialogs.length).toBe(1);
	}));
});
