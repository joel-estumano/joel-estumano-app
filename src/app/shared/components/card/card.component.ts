import { Component, computed, input } from '@angular/core';
import { IconName, IconComponent } from '../icon/icon.component';
import { NgOptimizedImage, NgStyle } from '@angular/common';

/**
 * Componente de cartão reutilizável.
 *
 * Representa um card visual contendo ícone, título, descrição, imagem e um highlight color de destaque.
 * Projetado para ser usado como um componente apresentacional em diferentes partes da aplicação.
 *
 * Exemplo de uso:
 * <app-card
 *   [icon]="'home'"
 *   [title]="'Título do card'"
 *   [description]="'Descrição sucinta do conteúdo.'"
 *   [img]="'/assets/imagens/exemplo.jpg'"
 *   [highlight]="'Novo'">
 * </app-card>
 *
 * @selector app-card
 * @remarks
 * Este componente importa NgStyle e um IconComponent para renderização de estilos e ícones.
 */

/**
 * Nome do ícone a ser exibido no card.
 *
 * Deve corresponder a um valor válido do tipo IconName usado pelo IconComponent.
 *
 * @type {IconName}
 * @example
 * // Exemplos: 'home', 'user', 'settings'
 */

/**
 * Título principal do card.
 *
 * Texto exibido em destaque como cabeçalho do cartão.
 *
 * @type {string}
 * @example
 * // 'Novo lançamento', 'Perfil do usuário'
 */

/**
 * Texto descritivo exibido abaixo do título.
 *
 * Fornece contexto ou resumo do conteúdo do card.
 *
 * @type {string}
 * @example
 * // 'Uma breve descrição sobre o conteúdo apresentado neste cartão.'
 */

/**
 * Caminho ou URL da imagem do card.
 *
 * Se fornecido, a imagem será exibida no card; caso contrário, a imagem será omitida.
 *
 * @type {string}
 * @example
 * // '/assets/images/photo.jpg', 'https://exemplo.com/img.png'
 */

/**
 * Sinalização de destaque do card (por exemplo: 'Novo', 'Destaque').
 *
 * Usado para exibir uma borda visual de ênfase do card.
 *
 * @type {string}
 * @example
 * // '#ff00ff', 'var(--chart-1)'
 */
@Component({
	selector: 'app-card',
	imports: [NgOptimizedImage, IconComponent, NgStyle],
	templateUrl: './card.component.html'
})
export class CardComponent {
	icon = input<IconName>();
	title = input<string>();
	description = input<string>();
	img = input<string>('img/service-sample-0.jpg');
	highlight = input<string>();

	highlightGradient = computed(() => {
		return `linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0) 0%, ${this.highlight()}, rgba(0,0,0,0) 100%)`;
	});
}
