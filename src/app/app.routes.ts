import { EnvironmentProviders, importProvidersFrom } from "@angular/core";
import { Routes } from "@angular/router";
import { NgxEditorModule } from "ngx-editor";

// Provê funcionalidades de editor (provavelmente texto ou rich text)
const provideEditor = (): EnvironmentProviders => {
	return importProvidersFrom(
		// https://sibiraj-s.github.io/ngx-editor/
		NgxEditorModule.forChild({
			locals: {
				undo: "Desfazer",
				redo: "Refazer",
				align_left: "Alinhar à Esquerda",
				align_center: "Centralizar",
				align_right: "Alinhar à Direita",
				align_justify: "Justificar",
				text_color: "Cor do texto",
				background_color: "Cor de fundo",
				remove: "Remover"
			}
		})
	);
};

export const routes: Routes = [
	{
		path: "",
		loadComponent: () => import("./layout/layout.component").then((c) => c.LayoutComponent),
		children: [
			{
				path: "",
				loadComponent: () => import("./layout/pages/home/home.component").then((c) => c.HomeComponent)
			},
			// {
			// 	path: 'sobre',
			// 	loadComponent: () => import('./layout/pages/about/about.component').then((c) => c.AboutComponent),
			// 	title: 'Sobre'
			// },
			{
				path: "contato",
				loadComponent: () => import("./layout/pages/contact/contact.component").then((c) => c.ContactComponent),
				title: "Contato",
				providers: [provideEditor()]
			},
			{
				path: "projetos/:id",
				loadComponent: () => import("./layout/pages/projetos/projetos.component").then((c) => c.ProjetosComponent),
				title: "Projeto"
			},
			{
				path: "blog",
				loadChildren: () => import("./layout/pages/blog/blog.module").then((m) => m.BlogModule),
				title: "Blog"
			}
		]
	},
	{ path: "**", redirectTo: "" }
];
