import ptBr from '@angular/common/locales/pt';
import {
	InMemoryScrollingFeature,
	InMemoryScrollingOptions,
	PreloadAllModules,
	provideRouter,
	TitleStrategy,
	withComponentInputBinding,
	withInMemoryScrolling,
	withPreloading
} from '@angular/router';
import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { CustomTitleStrategy } from './strategies/title.strategy';
import { importProvidersFrom } from '@angular/core';
import { provideClientHydration, withIncrementalHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig, withSessionStorage } from 'ngx-webstorage';
import { registerLocaleData } from '@angular/common';
import { RootDialogModule } from '@modules/root-dialog/root-dialog.module';
import { routes } from './app.routes';

registerLocaleData(ptBr);

const scrollConfig: InMemoryScrollingOptions = {
	scrollPositionRestoration: 'enabled',
	anchorScrolling: 'enabled'
};

const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
	providers: [
		// Ativa detecção de mudanças por zona com coalescência de eventos (otimiza performance)
		provideZoneChangeDetection({ eventCoalescing: true }),

		// Configura o roteamento da aplicação com:
		// - Scroll em memória
		// - Ligação de inputs diretamente nos componentes
		// - Pré-carregamento de todos os módulos
		provideRouter(routes, inMemoryScrollingFeature, withComponentInputBinding(), withPreloading(PreloadAllModules)),

		// Habilita hidratação incremental do lado do cliente (útil para SSR)
		provideClientHydration(withIncrementalHydration()),

		// Usa o Fetch API para requisições HTTP em vez do padrão XMLHttpRequest
		provideHttpClient(withFetch()),

		// Define a localização padrão para o app (idioma, formatação, etc.)
		{ provide: LOCALE_ID, useValue: 'pt-BR' },

		// Define uma estratégia de título customizada para as páginas
		{ provide: TitleStrategy, useClass: CustomTitleStrategy },

		// Configura o uso de armazenamento local e de sessão com prefixo customizado
		provideNgxWebstorage(
			withNgxWebstorageConfig({
				prefix: 'joelestumano.com',
				separator: ':',
				caseSensitive: true
			}),
			withLocalStorage(), // Habilita LocalStorage
			withSessionStorage() // Habilita SessionStorage
		),

		// Importa módulo de diálogo globalmente (útil para modais e afins)
		importProvidersFrom([
			RootDialogModule.forRoot() // Configuração global para o módulo de diálogos
		])
	]
};
