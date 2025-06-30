import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { NgxEditorModule } from 'ngx-editor';
import { Routes } from '@angular/router';

const provideEditor = (): EnvironmentProviders => {
	// https://sibiraj-s.github.io/ngx-editor/
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

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./layout/layout.component').then((c) => c.LayoutComponent),
		children: [
			{
				path: '',
				loadComponent: () => import('./layout/pages/home/home.component').then((c) => c.HomeComponent)
			},
			{
				path: 'contato',
				loadComponent: () => import('./layout/pages/contact/contact.component').then((c) => c.ContactComponent),
				title: 'Contato',
				providers: [provideEditor()]
			},
			{
				path: 'projetos/:id',
				loadComponent: () => import('./layout/pages/projetos/projetos.component').then((c) => c.ProjetosComponent),
				title: 'Projeto'
			},
			{
				path: 'blog',
				loadChildren: () => import('./layout/pages/blog/blog.module').then((m) => m.BlogModule),
				title: 'Blog'
			},
			{
				path: 'not-found',
				loadComponent: () => import('./layout/pages/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
				title: 'Não encontrado'
			},
			{
				path: 'error',
				loadComponent: () => import('./layout/pages/error-page/error-page.component').then((m) => m.ErrorPageComponent),
				title: 'Erro'
			}
		]
	},
	{ path: '**', redirectTo: '' }
];
