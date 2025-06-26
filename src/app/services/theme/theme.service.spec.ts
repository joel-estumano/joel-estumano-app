import { TestBed } from "@angular/core/testing";
import { ThemeService } from "./theme.service";
import { LocalStorageService } from "ngx-webstorage";

import { take } from "rxjs/operators";

describe("ThemeService", () => {
	let service: ThemeService;
	let mockStorage: jasmine.SpyObj<LocalStorageService>;

	beforeEach(() => {
		// mock do serviço
		mockStorage = jasmine.createSpyObj(LocalStorageService.name, ["retrieve", "store"]);

		TestBed.configureTestingModule({
			providers: [ThemeService, { provide: LocalStorageService, useValue: mockStorage }]
		});
	});

	it("deve inicializar com tema armazenado no localStorage, se existir", () => {
		mockStorage.retrieve.and.returnValue("light");
		service = TestBed.inject(ThemeService);

		service
			.change()
			.pipe(take(1))
			.subscribe((theme) => {
				expect(theme).toBe("light");
			});
		expect(mockStorage.retrieve).toHaveBeenCalledWith("theme");
	});

	it("deve inicializar com tema padrão se não houver no localStorage", () => {
		mockStorage.retrieve.and.returnValue(null);
		service = TestBed.inject(ThemeService);

		service
			.change()
			.pipe(take(1))
			.subscribe((theme) => {
				expect(theme).toBe("dark");
			});
		expect(mockStorage.store).toHaveBeenCalledWith("theme", "dark");
	});

	it("deve atualizar o tema e armazenar no localStorage", () => {
		mockStorage.retrieve.and.returnValue("dark");
		service = TestBed.inject(ThemeService);

		service.update("light");

		service
			.change()
			.pipe(take(1))
			.subscribe((theme) => {
				expect(theme).toBe("light");
			});
		expect(mockStorage.store).toHaveBeenCalledWith("theme", "light");
	});

	it("deve retornar true com isTheme se o tema atual for igual ao passado", () => {
		mockStorage.retrieve.and.returnValue("dark");
		service = TestBed.inject(ThemeService);

		expect(service.isTheme("dark")).toBeTrue();
		expect(service.isTheme("light")).toBeFalse();
	});
});
