import { BehaviorSubject, Observable } from "rxjs";
import { IDialogComponentOutletData as IDialogComponentOutletDataBase } from "../interfaces/dialog-component-outlet-data";
import { Injectable } from "@angular/core";

// Extende IComponentOutletData para incluir a propriedade opcional 'state'
export interface IDialogComponentOutletData<T, D> extends IDialogComponentOutletDataBase<T, D> {
	state?: {
		open: { set: (value: boolean) => void };
		isVisible: { set: (value: boolean) => void };
		isActive: { set: (value: boolean) => void };
	};
}

/**
 * Serviço responsável por gerenciar diálogos dinâmicos em uma aplicação Angular.
 *
 * @template T Tipo do componente que será instanciado no diálogo.
 * @template D Tipo dos dados que serão passados como entrada para o componente.
 */
@Injectable({
	providedIn: "root"
})
export class RootDialogService<T, D> {
	/**
	 * Subject que mantém a lista de diálogos ativos.
	 * Utiliza `BehaviorSubject` para permitir a emissão de valores iniciais e subsequentes.
	 */
	private dialogsSubject = new BehaviorSubject<IDialogComponentOutletData<T, D>[]>([]);

	/**
	 * Retorna um `Observable` da lista de diálogos ativos.
	 * Permite que outros componentes se inscrevam e reajam às mudanças.
	 *
	 * @returns Observable contendo a lista de diálogos ativos.
	 */
	observable(): Observable<IDialogComponentOutletData<T, D>[]> {
		return this.dialogsSubject.asObservable();
	}

	/**
	 * Adiciona um novo diálogo à lista de diálogos ativos.
	 *
	 * @param dialog Objeto contendo o componente e seus dados de entrada.
	 */
	launch(dialog: IDialogComponentOutletData<T, D>) {
		this.dialogsSubject.next([...this.dialogsSubject.value, dialog]);
	}

	/**
	 * Remove um diálogo da lista de diálogos ativos com base no índice fornecido.
	 *
	 * @param index Índice do diálogo a ser removido.
	 */
	remove(index: number) {
		const current = this.dialogsSubject.value;

		// Verifica se o índice é válido antes de tentar remover
		if (index < 0 || index >= current.length) return;

		// Verifica se `state` existe antes de modificar
		if (current[index]?.state) {
			// Atualiza os estados do diálogo para iniciar o fechamento
			current[index].state.open.set(false);
			current[index].state.isActive.set(false);
		}

		// Aguarda a animação antes de remover o diálogo
		setTimeout(() => {
			current[index].state?.isVisible.set(false);
			const updated = [...current.slice(0, index), ...current.slice(index + 1)];
			this.dialogsSubject.next(updated);
		}, 150); // Tempo da animação em milissegundos
	}

	/**
	 * Obtém o número atual de diálogos gerenciados pelo serviço.
	 *
	 * @returns O número de diálogos no array `dialogsSubject`.
	 */
	get dialogsLength(): number {
		return this.dialogsSubject.value.length;
	}
}
