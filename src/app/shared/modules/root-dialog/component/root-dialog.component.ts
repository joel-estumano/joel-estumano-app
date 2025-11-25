import { Component, effect, inject, InjectionToken, Renderer2, RendererStyleFlags2, signal, WritableSignal, DOCUMENT } from '@angular/core';
import { IDialogComponentOutletData as IDialogComponentOutletDataBase } from '../interfaces/dialog-component-outlet-data';
import { RootDialogService } from '../service/root-dialog.service';

// Criação de um token de injeção para a janela global (window)
export const WINDOW = new InjectionToken<Window>('window.token', {
	factory: () => {
		// Verifica se o objeto window está disponível no ambiente
		if (typeof window !== 'undefined') {
			return window;
		}
		// Retorna uma instância de Window caso não esteja disponível
		/* istanbul ignore next */
		return new Window();
	}
});

// Extende IComponentOutletData para incluir a propriedade opcional 'state'
interface IDialogComponentOutletData<T, D> extends IDialogComponentOutletDataBase<T, D> {
	state:
		| {
				open: WritableSignal<boolean>; // Indica se o diálogo está aberto
				isVisible: WritableSignal<boolean>; // Indica se o diálogo está visível
				isActive: WritableSignal<boolean>; // Indica se o diálogo está ativo
		  }
		| undefined;
}

@Component({
	standalone: false,
	selector: 'app-root-dialog',
	templateUrl: './root-dialog.component.html',
	styleUrl: './root-dialog.component.css'
})
export class RootDialogComponent<T, D> {
	// Lista de diálogos gerenciada por sinais reativos
	dialogs = signal<IDialogComponentOutletData<T, D>[]>([]);

	// Injeção de dependências necessárias para manipulação do DOM e serviços
	private window = inject(WINDOW); // Injeção do objeto window
	private document = inject(DOCUMENT); // Injeção do objeto document
	private renderer = inject(Renderer2); // Injeção do serviço Renderer2 para manipulação do DOM
	private service = inject(RootDialogService<T, D>); // Injeção do serviço de diálogos

	constructor() {
		// Observa mudanças nos diálogos e atualiza a lista
		this.service.observable().subscribe((dialogs) => this.dialogs.set(dialogs as IDialogComponentOutletData<T, D>[]));

		// Efeito reativo que gerencia o estado dos diálogos
		effect(() => {
			// Ajusta o comportamento de rolagem da página com base na presença de diálogos
			this.handlerScroll(this.dialogs().length > 0);

			// Itera sobre os diálogos e inicializa seus estados, se necessário
			for (const dialog of this.dialogs()) {
				if (!dialog.state) {
					dialog.state = {
						open: signal(true), // Inicialmente aberto
						isVisible: signal(true), // Inicialmente visível
						isActive: signal(false) // Inicialmente inativo
					};
					// Ativa o diálogo de forma assíncrona
					queueMicrotask(() => dialog.state!.isActive.set(true));
				}
			}
		});
	}

	// Método para fechar um diálogo específico
	close(index: number) {
		const dialog = this.dialogs()[index];
		if (!dialog?.state) return;

		this.service.remove(index); // Remove o diálogo do serviço
	}

	// Método para manipular a rolagem da página quando há diálogos abertos
	handlerScroll(hasDialogs: boolean) {
		// Calcula a largura da barra de rolagem
		const scrollbarWidth = this.window.innerWidth - this.document.documentElement.clientWidth;
		// Define a largura da barra de rolagem como uma variável CSS
		this.renderer.setStyle(this.document.body, '--scrollbar', `${scrollbarWidth}px`, RendererStyleFlags2.DashCase);

		// Se houver diálogos abertos, desativa a rolagem e adiciona uma classe ao body
		if (hasDialogs) {
			this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
			this.renderer.addClass(this.document.body, 'on-dialog');
		} else {
			// Caso contrário, restaura a rolagem e remove a classe
			this.renderer.setStyle(this.document.body, 'overflow', '');
			this.renderer.removeClass(this.document.body, 'on-dialog');
		}
	}
}
