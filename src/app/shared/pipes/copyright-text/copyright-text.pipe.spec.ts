import { CopyrightTextPipe } from './copyright-text.pipe';

describe('CopyrightTextPipe', () => {
	let pipe: CopyrightTextPipe;

	const mockName = 'Joel Estumano';
	const currentYear = new Date().getFullYear();
	const pastYear = 2020;

	beforeEach(() => {
		pipe = new CopyrightTextPipe();
	});

	it('deve criar a instância do pipe', () => {
		expect(pipe).toBeTruthy();
	});

	it('deve retornar texto com ano único se startYear for igual ao ano atual', () => {
		const result = pipe.transform(mockName, currentYear);
		expect(result).toBe(`${mockName} © ${currentYear}`);
	});

	it('deve retornar texto com intervalo de anos se startYear for menor que o ano atual', () => {
		const result = pipe.transform(mockName, pastYear);
		expect(result).toBe(`${mockName} © ${pastYear}-${currentYear}`);
	});

	it('deve lançar erro se o parâmetro "text" for ausente', () => {
		expect(() => pipe.transform(undefined as unknown as string, pastYear)).toThrowError('O parâmetro "text" é obrigatório e deve ser uma string.');
	});

	it('deve lançar erro se o parâmetro "startYear" for ausente', () => {
		expect(() => pipe.transform(mockName, undefined as unknown as number)).toThrowError(
			'O parâmetro "startYear" é obrigatório e deve ser um número inteiro.'
		);
	});

	it('deve lançar erro se "text" não for uma string', () => {
		expect(() => pipe.transform(123 as unknown as string, pastYear)).toThrowError('O parâmetro "text" é obrigatório e deve ser uma string.');
	});

	it('deve lançar erro se "startYear" não for um número', () => {
		expect(() => pipe.transform(mockName, '2020' as unknown as number)).toThrowError('O parâmetro "startYear" é obrigatório e deve ser um número inteiro.');
	});
});
