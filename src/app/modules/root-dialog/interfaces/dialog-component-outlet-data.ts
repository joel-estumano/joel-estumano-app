import { Type } from '@angular/core';

/**
 * Interface que define os dados necessários para a criação dinâmica de um componente.
 *
 * @template T Tipo do componente que será instanciado.
 * @template D Tipo dos dados que serão passados como entrada para o componente.
 * @template K Tipo da chave usada para armazenar os dados de entrada (por padrão, 'data').
 */
export interface IDialogComponentOutletData<T, D, K extends string = 'data'> {
	/**
	 * Tipo do componente que será instanciado dinamicamente.
	 */
	component: Type<T>;

	/**
	 * Objeto contendo os dados de entrada para o componente, organizados por chave.
	 * A chave padrão é 'data', mas pode ser personalizada.
	 * &
	 * Função de callback opcional que pode ser executada pelo componente.
	 * Pode ser usada para notificações, ações após fechamento, etc.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	inputs: Record<K, D & { callback?: (result?: any) => void }>;

	/**
	 * Define se o botão de fechar deve ser exibido no diálogo.
	 */
	hideCloseButton?: boolean;
}
