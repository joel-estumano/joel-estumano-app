import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { cn } from '@shared/utils';

/**
 * Componente SectionComponent
 *
 * Este componente representa uma seção configurável que pode conter classes CSS dinâmicas
 * e um estado de "full" para controle de largura.
 */
@Component({
	selector: 'app-section',
	imports: [NgClass],
	templateUrl: './section.component.html'
})
export class SectionComponent {
	/**
	 * Define se a seção deve ocupar o espaço total de largura disponível.
	 *
	 * @input full - Indica se a seção está em modo expandido.
	 * @type boolean
	 * @default false
	 */
	public full = input<boolean>(false);

	/**
	 * Define classes CSS personalizadas para serem aplicadas ao componente.
	 *
	 * @input class - Lista de classes CSS a serem aplicadas.
	 * @type string
	 */
	public class = input<string>();

	/**
	 * Propriedade computada que gera a classe CSS mesclada para o componente.
	 *
	 * Esta propriedade usa a função `mergeClass` para combinar estilos e reutiliza
	 * sua lógica otimizada para evitar conflitos.
	 *
	 * Consulte a documentação da função `mergeClass` para mais detalhes.
	 *
	 * @see cn
	 */
	protected mergeClass = computed((): string => {
		return cn('flex w-full h-full py-20 sm:py-24 xl:py-32', this.class() as string);
	});
}
