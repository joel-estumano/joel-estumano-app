import { TestBed } from "@angular/core/testing";
import { CanActivateFn, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { postExistGuard } from "./post-exist.guard";
import { posts } from "../constants";

describe("postExistGuard", () => {
	let navigateSpy: jasmine.Spy;
	let routerMock: Partial<Router>;

	const executeGuard: CanActivateFn = (route, state) => TestBed.runInInjectionContext(() => postExistGuard(route as ActivatedRouteSnapshot, state));

	beforeEach(() => {
		navigateSpy = jasmine.createSpy("navigate");
		routerMock = {
			navigate: navigateSpy
		};

		TestBed.configureTestingModule({
			providers: [{ provide: Router, useValue: routerMock }]
		});
	});

	it("deve permitir navegação se o post existir", () => {
		const existingId = posts[0].id;
		const route = { paramMap: new Map([["id", existingId]]) } as unknown as ActivatedRouteSnapshot;

		const state = {} as RouterStateSnapshot; // Mock or minimal RouterStateSnapshot
		const result = executeGuard(route, state);
		expect(result).toBeTrue();
		expect(navigateSpy).not.toHaveBeenCalled();
	});

	it("deve bloquear e redirecionar se o post não existir", () => {
		const route = { paramMap: new Map([["id", "id-invalido"]]) } as unknown as ActivatedRouteSnapshot;
		const state = {} as RouterStateSnapshot; // Mock or minimal RouterStateSnapshot
		const result = executeGuard(route, state);
		expect(result).toBeFalse();
		expect(navigateSpy).toHaveBeenCalledWith(["/blog"]);
		expect(navigateSpy).toHaveBeenCalledWith(["/blog"]);
	});
});
