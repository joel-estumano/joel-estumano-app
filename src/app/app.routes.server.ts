import { RenderMode, ServerRoute } from "@angular/ssr";
import { PROFILE } from "./tokens";
import { inject } from "@angular/core";
import { posts } from "./layout/pages/blog/constants";

// Server-Side Rendering (SSR):
// O conteúdo é renderizado no servidor para cada solicitação.
// Vantagens: Melhor para SEO e tempo de carregamento inicial.

// Static Site Generation (SSG):
// O conteúdo é pré-renderizado no momento da construção e servido como arquivos estáticos.
// Vantagens: Melhor desempenho, ainda bom para SEO.

// Client-Side Rendering (CSR):
// O conteúdo é renderizado no lado do cliente no navegador.
// Vantagens: Aplicações interativas e dinâmicas.
// Desvantagens: SEO menos eficaz, tempo de carregamento inicial mais lento.

export const serverRoutes: ServerRoute[] = [
	{
		path: "",
		renderMode: RenderMode.Server
	},
	// {
	// 	path: 'sobre',
	// 	renderMode: RenderMode.Server
	// },
	{
		path: "contato",
		renderMode: RenderMode.Client
	},
	{
		path: "projetos/:id",
		renderMode: RenderMode.Prerender,
		async getPrerenderParams() {
			const profile = inject(PROFILE);
			const ids = profile.projects.map((p) => p.id);
			return ids.map((id) => ({ id }));
		} // doc reference: https://angular.dev/guide/hybrid-rendering
	},
	{
		path: "blog",
		renderMode: RenderMode.Server
	},
	{
		path: "blog/:id",
		renderMode: RenderMode.Prerender,
		async getPrerenderParams() {
			const ids = posts.map((p) => p.id);
			return ids.map((id) => ({ id }));
		}
	},
	{
		path: "**",
		renderMode: RenderMode.Prerender
	}
];
