import { Injectable } from "@angular/core";
import { IPost } from "@types";
import { Observable, Subscriber } from "rxjs";

const contents: IPost[] = [
	{
		id: "NmLKPzjxMs",
		content: `	<div>
				<div class="flex w-full flex-col space-y-6 p-4 sm:p-8 xl:p-12">
					<p>
						Então. Recentemente, trabalhei em um projeto para um cliente onde precisei implementar um sistema de diálogos dinâmicos no Angular. Como
						esse é um recurso essencial em muitas aplicações, resolvi compartilhar a forma como lido com esse tipo de implementação.
					</p>
					<p>
						🚀 No projeto, utilizei componentes dinâmicos, sinais reativos e um serviço centralizado para garantir um sistema de modais flexível,
						eficiente e fácil de manter. Agora, essa abordagem está disponível para quem quiser aprender ou aprimorar sua própria implementação!
					</p>
                    <div class="inline-flex items-center gap-3">
                        <a
                            class="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md px-3 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-2.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                            target="_blank"
                            href="https://github.com/joel-estumano/angular-dialog-sample/"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                                ></path>
                            </svg>
                            GitHub
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                                style="stroke-width: var(--ng-icon__stroke-width, 1.5)"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"></path>
                            </svg>
                        </a>
                        <a
                            class="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md px-3 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-2.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                            target="_blank"
                            href="https://angular-dialog-sample.vercel.app/"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M20.92 2.38A15.72 15.72 0 0 0 17.5 2a8.26 8.26 0 0 0-6 2.06Q9.89 5.67 8.31 7.27c-1.21-.13-4.08-.2-6 1.74a1 1 0 0 0 0 1.41l11.3 11.32a1 1 0 0 0 1.41 0c1.95-2 1.89-4.82 1.77-6l3.21-3.2c3.19-3.19 1.74-9.18 1.68-9.43a1 1 0 0 0-.76-.73zm-2.36 8.75L15 14.67a1 1 0 0 0-.27.9 6.81 6.81 0 0 1-.54 3.94L4.52 9.82a6.67 6.67 0 0 1 4-.5A1 1 0 0 0 9.39 9s1.4-1.45 3.51-3.56A6.61 6.61 0 0 1 17.5 4a14.51 14.51 0 0 1 2.33.2c.24 1.43.62 5.04-1.27 6.93z"
                                ></path>
                                <circle cx="15.73" cy="8.3" r="2"></circle>
                                <path d="M5 16c-2 1-2 5-2 5a7.81 7.81 0 0 0 5-2z"></path>
                            </svg>
                            Demo
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                                style="stroke-width: var(--ng-icon__stroke-width, 1.5)"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"></path>
                            </svg>
                        </a>
                    </div>
				</div>
                <div class="border-y">
					<img class="h-auto max-w-full" src="img/dialog-sample-0.png" alt="Joel Estumano" />
				</div>
                <div class="flex w-full flex-col space-y-6 p-4 sm:p-8 xl:p-12">
                    <p>
                        Usar componentes dinâmicos para diálogos no Angular oferece uma série de benefícios relevantes, especialmente em aplicações que exigem interfaces
                        modulares, reutilizáveis e flexíveis.
                    </p>
                    <p>
                        ✨ Ao optar por componentes dinâmicos, você desacopla completamente a estrutura do diálogo do seu template principal, permitindo que diferentes tipos
                        de conteúdo sejam carregados sob demanda. Isso significa que, em vez de manter múltiplos diálogos já carregados na memória — mesmo que não estejam
                        visíveis — você cria apenas aquilo que é necessário, no momento em que for necessário. Essa abordagem melhora a performance da aplicação e evita a
                        sobrecarga do DOM.
                    </p>
                </div>
				<div class="border-y">
					<img class="h-auto max-w-full" src="img/dialog-sample-1.png" alt="Joel Estumano" />
				</div>
                <div class="flex w-full flex-col space-y-6 p-4 sm:p-8 xl:p-12">
                    <p>
                        💪 Outro ponto forte é a reutilização. Com componentes dinâmicos, você consegue criar diálogos genéricos e altamente configuráveis, que podem ser
                        usados em diversos cenários apenas alterando os dados e comportamentos passados para eles. Isso reduz duplicação de código, facilita a manutenção e
                        proporciona uma arquitetura mais limpa.
                    </p>
                </div>
                <div class="border-y">
					<img class="h-auto max-w-full" src="img/dialog-sample-2.png" alt="Joel Estumano" />
				</div>
				<div class="flex w-full flex-col space-y-6 p-4 sm:p-8 xl:p-12">
                    <p>
                        Em um contexto colaborativo ou em aplicações de larga escala, essa abordagem também ajuda a manter os módulos mais isolados e testáveis, uma vez que
                        os diálogos deixam de depender diretamente da estrutura da tela onde são disparados.
                    </p>
                    <p>
                        🌟 Com tudo isso, você ganha eficiência, flexibilidade, modularidade e manutenibilidade —
                        qualidades essenciais para projetos modernos e escaláveis.
                    </p>
					<p>
						Se você trabalha com Angular e precisa de um sistema de diálogos escalável, dá uma olhada no projeto que compartilhei no GitHub. Espero que seja útil!
					</p>
				</div>
			</div>`
	},
	{
		id: "uwihA03Elb",
		content: `<div>
			<div class="grid grid-rows-1">
				<div class="relative max-h-[400px] overflow-hidden">
					<img
						class="h-auto w-full"
						src="https://joel-estumano.github.io/public/img/apps/boilerplate-nestjs-typeorm-swagger-1912x850.png"
						alt=""
					/>
					<div class="from-background absolute right-0 bottom-0 left-0 h-[30%] bg-gradient-to-t to-transparent"></div>
				</div>
			</div>
			<div class="flex w-full flex-col space-y-6 p-4 sm:p-8 xl:p-12">
				<p>
					Quem nunca precisou configurar um novo projeto NestJS com TypeORM do zero e percebeu que, na prática, não é um desafio, mas sim uma tarefa
					repetitiva? Mesmo que seja só copiar e colar dependências, ajustar Prettier, Lint, Husky, configurar o banco de dados e definir processos de
					CI, é sempre a mesma rotina.
				</p>
				<p>
					E quando a urgência bate à porta—como num processo seletivo em que você precisa implementar um CRUD básico rapidamente—esse trabalho inicial
					pode acabar consumindo tempo que poderia ser melhor gasto na lógica de negócio.
				</p>
				<p>💡 Ter um boilerplate bem estruturado elimina essa repetição e permite focar no que realmente importa.</p>
				<p>
					💡 Pensando nisso, gostaria de compartilhar o repositório do projeto, que pode ser um ótimo ponto de partida para quem está começando no
					NestJS e na estruturação de back-end. Ele já inclui configurações prontas para uso, eliminando a necessidade de configurar tudo do zero e
					permitindo um foco maior no desenvolvimento da lógica de negócio.
				</p>
				<div class="inline-flex items-center gap-3">
					<a
						class="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md px-3 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-2.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
						target="_blank"
						href="https://github.com/joel-estumano/boilerplate-nestjs-typeorm"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
							></path>
						</svg>
						GitHub
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
							data-slot="icon"
							style="stroke-width: var(--ng-icon__stroke-width, 1.5)"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"></path>
						</svg>
					</a>
				</div>
			</div>
		</div>`
	}
];

@Injectable({
	providedIn: "platform"
})
export class BlogService {
	contentPost(id: string): Observable<IPost | undefined> {
		return new Observable((sub: Subscriber<IPost | undefined>) => {
			sub.next(contents.find((c) => c.id === id) || undefined);
		});
	}
}
