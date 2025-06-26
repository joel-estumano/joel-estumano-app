import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpService } from "./http.service";
import { HttpErrorResponse } from "@angular/common/http";

interface Mensagem {
	message: string;
}

interface Pessoa {
	nome: string;
}

interface RespostaPessoa {
	sucesso: boolean;
}

interface Atualizacao {
	id: number;
}

interface ResultadoAtualizacao {
	atualizado: boolean;
}

interface StatusAtivo {
	ativo: boolean;
}

interface ResultadoPatch {
	sucesso: boolean;
}

interface Exclusao {
	deletado: boolean;
}

describe("HttpService", () => {
	let service: HttpService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [HttpService]
		});

		service = TestBed.inject(HttpService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it("deve realizar GET corretamente", () => {
		const respostaEsperada: Mensagem = { message: "sucesso" };

		service.get<Mensagem>("mensagem").subscribe((resposta) => {
			expect(resposta).toEqual(respostaEsperada);
		});

		const req = httpMock.expectOne(`${service["apiURL"]}/mensagem`);
		expect(req.request.method).toBe("GET");
		req.flush(respostaEsperada);
	});

	it("deve realizar POST corretamente", () => {
		const corpo: Pessoa = { nome: "Joel" };
		const resposta: RespostaPessoa = { sucesso: true };

		service.post<Pessoa, RespostaPessoa>("pessoa", corpo).subscribe((retorno) => {
			expect(retorno).toEqual(resposta);
		});

		const req = httpMock.expectOne(`${service["apiURL"]}/pessoa`);
		expect(req.request.method).toBe("POST");
		expect(req.request.body).toEqual(corpo);
		req.flush(resposta);
	});

	it("deve realizar PUT corretamente", () => {
		const dados: Atualizacao = { id: 42 };
		const resposta: ResultadoAtualizacao = { atualizado: true };

		service.put<Atualizacao, ResultadoAtualizacao>("atualizar", dados).subscribe((r) => {
			expect(r).toEqual(resposta);
		});

		const req = httpMock.expectOne(`${service["apiURL"]}/atualizar`);
		expect(req.request.method).toBe("PUT");
		expect(req.request.body).toEqual(dados);
		req.flush(resposta);
	});

	it("deve realizar PATCH corretamente", () => {
		const payload: StatusAtivo = { ativo: true };
		const resultado: ResultadoPatch = { sucesso: true };

		service.patch<StatusAtivo, ResultadoPatch>("patchar", payload).subscribe((r) => {
			expect(r).toEqual(resultado);
		});

		const req = httpMock.expectOne(`${service["apiURL"]}/patchar`);
		expect(req.request.method).toBe("PATCH");
		expect(req.request.body).toEqual(payload);
		req.flush(resultado);
	});

	it("deve realizar DELETE corretamente", () => {
		const resposta: Exclusao = { deletado: true };

		service.delete<Exclusao>("excluir").subscribe((retorno) => {
			expect(retorno).toEqual(resposta);
		});

		const req = httpMock.expectOne(`${service["apiURL"]}/excluir`);
		expect(req.request.method).toBe("DELETE");
		req.flush(resposta);
	});

	it("deve lidar com erro via errorHandler", () => {
		const erroMensagem = "Erro inesperado";

		service.get<Mensagem>("falha").subscribe({
			next: () => fail("Não deveria emitir sucesso"),
			error: (err: Error) => {
				expect(err).toBeInstanceOf(Error);
				expect(err.message).toBe(erroMensagem);
			}
		});

		const req = httpMock.expectOne(`${service["apiURL"]}/falha`);
		req.flush({ message: erroMensagem }, { status: 500, statusText: "Falha interna" });
	});

	it("deve usar error.error.message se estiver presente", (done) => {
		const erro = new HttpErrorResponse({
			status: 400,
			error: { message: "Mensagem da API" }
		});

		service["errorHandler"](erro).subscribe({
			error: (err) => {
				expect(err.message).toBe("Mensagem da API");
				done();
			}
		});
	});

	it("deve usar error.message se error.error.message não existir", (done) => {
		const erro = new HttpErrorResponse({
			status: 400,
			error: {}
		});

		Object.defineProperty(erro, "message", {
			get: () => "Mensagem do Angular"
		});

		service["errorHandler"](erro).subscribe({
			error: (err) => {
				expect(err.message).toBe("Mensagem do Angular");
				done();
			}
		});
	});

	it('deve retornar "Erro desconhecido" se nenhuma mensagem estiver disponível', (done) => {
		const erro = new HttpErrorResponse({
			status: 500,
			error: undefined
		});

		Object.defineProperty(erro, "message", {
			get: () => undefined
		});

		service["errorHandler"](erro).subscribe({
			error: (err) => {
				expect(err.message).toBe("Erro desconhecido");
				done();
			}
		});
	});
});
