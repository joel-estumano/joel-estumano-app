import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'copyrightText'
})
export class CopyrightTextPipe implements PipeTransform {
	transform(text: string, startYear: number): string {
		const currentYear = new Date().getFullYear();

		if (!text || typeof text !== 'string') {
			throw new Error('O parâmetro "text" é obrigatório e deve ser uma string.');
		}

		if (!startYear || typeof startYear !== 'number') {
			throw new Error('O parâmetro "startYear" é obrigatório e deve ser um número inteiro.');
		}

		return startYear === currentYear ? `${text} © ${currentYear}` : `${text} © ${startYear}-${currentYear}`;
	}
}
