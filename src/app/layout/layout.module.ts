import { CopyrightTextPipe } from '@shared/pipes/copyright-text/copyright-text.pipe';
import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';
import { LayoutComponent } from './layout.component';
import { LinkComponent } from '@shared/ui/link/link.component';
import { NavBarComponent } from '@shared/components/nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { NgxEditorModule } from 'ngx-editor';
import { RootDialogModule } from '@shared/modules/root-dialog/root-dialog.module';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';

/**
 * Fornece os provedores necessários para configurar o módulo NgxEditor com localizações personalizadas.
 *
 * Este editor é baseado no ngx-editor, uma biblioteca rica para edição de texto em Angular.
 * Veja mais detalhes e opções de configuração em: https://sibiraj-s.github.io/ngx-editor/
 *
 * As traduções fornecidas em `locals` personalizam os rótulos dos botões e ações do editor
 * para o idioma português.
 *
 * @returns {EnvironmentProviders} Um conjunto de provedores que devem ser incluídos no ambiente
 * de injeção de dependência do Angular para habilitar o editor com as configurações especificadas.
 */
const provideEditor = (): EnvironmentProviders => {
	return importProvidersFrom(
		NgxEditorModule.forChild({
			locals: {
				undo: 'Desfazer',
				redo: 'Refazer',
				align_left: 'Alinhar à Esquerda',
				align_center: 'Centralizar',
				align_right: 'Alinhar à Direita',
				align_justify: 'Justificar',
				text_color: 'Cor do texto',
				background_color: 'Cor de fundo',
				remove: 'Remover'
			}
		})
	);
};

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent),
				title: 'Home'
			},
			{
				path: 'blog',
				loadComponent: () => import('./pages/blog/blog.component').then((c) => c.BlogComponent),
				title: 'Blog'
			},
			{
				path: 'contato',
				loadComponent: () => import('./pages/contact/contact.component').then((c) => c.ContactComponent),
				title: 'Contato',
				providers: [provideEditor()]
			},
			{
				path: 'projetos/:id',
				loadComponent: () => import('./pages/projetos/projetos.component').then((c) => c.ProjetosComponent),
				title: 'Projeto'
			},
			{
				path: 'not-found',
				loadComponent: () => import('./pages/not-found-page/not-found-page.component').then((c) => c.NotFoundPageComponent),
				title: 'Não encontrado'
			},
			{
				path: 'error',
				loadComponent: () => import('./pages/error-page/error-page.component').then((c) => c.ErrorPageComponent),
				title: 'Erro'
			},
			{ path: '**', redirectTo: 'not-found' }
		]
	}
];

@NgModule({
	declarations: [LayoutComponent],
	imports: [CopyrightTextPipe, IconComponent, LinkComponent, NavBarComponent, RootDialogModule, RouterModule.forChild(routes), RouterOutlet]
})
export class LayoutModule {}
