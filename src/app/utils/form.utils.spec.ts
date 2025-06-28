import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormUtils } from './form.utils';

describe('FormUtils.invalidClass', () => {
	it('retorna true quando dirty, inválido e submitted', () => {
		const control = new FormControl('');
		control.markAsDirty();
		control.setErrors({ required: true });

		const result = FormUtils.invalidClass(control);
		expect(result).toEqual({ 'is-invalid': true });
	});

	it('retorna false quando válido mesmo se dirty e submitted', () => {
		const control = new FormControl('valor');
		control.markAsDirty();

		const result = FormUtils.invalidClass(control);
		expect(result).toEqual({ 'is-invalid': false });
	});

	it('retorna false quando não está dirty nem touched', () => {
		const control = new FormControl('');
		control.setErrors({ required: true });

		const result = FormUtils.invalidClass(control);
		expect(result).toEqual({ 'is-invalid': false });
	});

	it('retorna false se submitted for false', () => {
		const control = new FormControl('');
		control.markAsTouched();
		control.setErrors({ required: true });

		const result = FormUtils.invalidClass(control, false);
		expect(result).toEqual({ 'is-invalid': false });
	});
});

describe('FormUtils.valid', () => {
	it('marca todos os FormControls como dirty e retorna true se o form for válido', () => {
		const form = new FormGroup({
			nome: new FormControl('Joel'),
			email: new FormControl('joel@example.com')
		});

		const result = FormUtils.valid(form);
		expect(result).toBeTrue();
		expect(form.get('nome')?.dirty).toBeTrue();
		expect(form.get('email')?.dirty).toBeTrue();
	});

	it('valida FormGroup aninhado', () => {
		const form = new FormGroup({
			endereco: new FormGroup({
				rua: new FormControl('Rua A'),
				cidade: new FormControl('Belém')
			})
		});

		const result = FormUtils.valid(form);
		expect(result).toBeTrue();
		const nested = form.get('endereco') as FormGroup;
		expect(nested.get('rua')?.dirty).toBeTrue();
		expect(nested.get('cidade')?.dirty).toBeTrue();
	});

	it('valida FormArray com FormGroups', () => {
		const form = new FormGroup({
			contatos: new FormArray([
				new FormGroup({
					tipo: new FormControl('telefone'),
					valor: new FormControl('123456')
				})
			])
		});

		const result = FormUtils.valid(form);
		expect(result).toBeTrue();
		const array = form.get('contatos') as FormArray;
		const grupo = array.at(0) as FormGroup;
		expect(grupo.get('tipo')?.dirty).toBeTrue();
		expect(grupo.get('valor')?.dirty).toBeTrue();
	});

	it('retorna false se houver campo inválido', () => {
		const form = new FormGroup({
			nome: new FormControl('', [Validators.required])
		});

		const result = FormUtils.valid(form);
		expect(result).toBeFalse();
	});

	it('ignora controle indefinido (simula acesso null)', () => {
		const form = new FormGroup({});
		spyOn(form, 'get').and.returnValue(null);

		const result = FormUtils.valid(form);
		expect(result).toBeTrue();
	});
});

describe('FormUtils.notEmpty', () => {
	it('deve retornar { empty: true } para string em branco', () => {
		const control = new FormControl('   ');
		expect(FormUtils.notEmpty(control)).toEqual({ empty: true });
	});

	it('deve retornar { empty: true } se valor não for string', () => {
		const control = new FormControl(null as unknown as string);
		expect(FormUtils.notEmpty(control)).toEqual({ empty: true });
	});

	it('deve retornar { emptyTagContent: true } se tag HTML tiver conteúdo vazio', () => {
		const control = new FormControl('<p>     </p>');
		expect(FormUtils.notEmpty(control)).toEqual({ emptyTagContent: true });
	});

	it('deve retornar null para string comum com conteúdo', () => {
		const control = new FormControl('Valor válido');
		expect(FormUtils.notEmpty(control)).toBeNull();
	});

	it('deve retornar null para HTML com conteúdo válido', () => {
		const control = new FormControl('<div>teste</div>');
		expect(FormUtils.notEmpty(control)).toBeNull();
	});
});

describe('FormUtils.getControl', () => {
	it('deve retornar o controle pelo nome fornecido', () => {
		const form = new FormGroup({
			email: new FormControl('joel@example.com'),
			nome: new FormControl('Joel')
		});

		const control = FormUtils.getControl(form, 'email');

		expect(control.value).toBe('joel@example.com');
	});
});
