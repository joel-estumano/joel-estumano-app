import { RenderMode, ServerRoute } from '@angular/ssr';
import { PROFILE } from './core/tokens';
import { inject } from '@angular/core';

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
		path: '',
		renderMode: RenderMode.Server
	},
	{
		path: 'contato',
		renderMode: RenderMode.Client
	},
	{
		path: 'projetos/:id',
		renderMode: RenderMode.Prerender,
		async getPrerenderParams() {
			const profile = inject(PROFILE);
			return profile.projects.map((p) => ({ id: p.id }));
		} // doc reference: https://angular.dev/guide/hybrid-rendering
	},
	{
		path: 'blog',
		renderMode: RenderMode.Server
	},
	{
		path: 'blog/:id',
		renderMode: RenderMode.Server
	},
	{
		path: 'not-found',
		renderMode: RenderMode.Server
	},
	{
		path: 'error',
		renderMode: RenderMode.Server
	},
	{
		path: '**',
		renderMode: RenderMode.Server
	}
];
