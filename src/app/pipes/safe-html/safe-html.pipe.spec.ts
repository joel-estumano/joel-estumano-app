import { SafeHtmlPipe } from "./safe-html.pipe";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

describe("SafeHtmlPipe", () => {
	let sanitizerMock: jasmine.SpyObj<DomSanitizer>;
	let pipe: SafeHtmlPipe;

	beforeEach(() => {
		sanitizerMock = jasmine.createSpyObj(DomSanitizer.name, ["bypassSecurityTrustHtml"]);
		pipe = new SafeHtmlPipe(sanitizerMock);
	});

	it("deve criar uma instância", () => {
		expect(pipe).toBeTruthy();
	});

	it("deve retornar valor seguro quando a string for válida", () => {
		const html = "<strong>Olá</strong>";
		const fakeSanitized = {} as SafeHtml;

		sanitizerMock.bypassSecurityTrustHtml.and.returnValue(fakeSanitized);
		const result = pipe.transform(html);

		expect(sanitizerMock.bypassSecurityTrustHtml).toHaveBeenCalledWith(html);
		expect(result).toBe(fakeSanitized);
	});

	it("deve retornar string vazia quando valor for undefined", () => {
		const result = pipe.transform(undefined);

		expect(result).toBe("");
		expect(sanitizerMock.bypassSecurityTrustHtml).not.toHaveBeenCalled();
	});
});
