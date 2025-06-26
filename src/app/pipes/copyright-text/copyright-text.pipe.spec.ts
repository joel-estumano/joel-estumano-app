import { CopyrightTextPipe } from "./copyright-text.pipe";
import { IProfileData } from "@types";

describe("CopyrightTextPipe", () => {
	let pipe: CopyrightTextPipe;
	const currentYear = new Date().getFullYear();

	beforeEach(() => {
		pipe = new CopyrightTextPipe();
	});

	it("deve retornar string vazia se profile for undefined", () => {
		expect(pipe.transform(undefined!)).toBe("");
	});

	it("deve retornar string vazia se profile.professionalStart estiver ausente", () => {
		const profile = { name: "Joel" } as IProfileData;
		expect(pipe.transform(profile)).toBe("");
	});

	it('deve retornar "Nome © [anoAtual]" se ano for igual ao atual', () => {
		const profile = {
			name: "Joel",
			professionalStart: currentYear
		} as IProfileData;

		const result = pipe.transform(profile);
		expect(result).toBe(`Joel © ${currentYear}`);
	});

	it('deve retornar "Nome © [início]-[anoAtual]" se ano for diferente', () => {
		const profile = {
			name: "Joel",
			professionalStart: currentYear - 5
		} as IProfileData;

		const result = pipe.transform(profile);
		expect(result).toBe(`Joel © ${currentYear - 5}-${currentYear}`);
	});

	it("deve retornar string vazia se profile existir mas name for ausente", () => {
		const profile = {
			professionalStart: currentYear
		} as IProfileData;

		expect(pipe.transform(profile)).toBe("");
	});
});
