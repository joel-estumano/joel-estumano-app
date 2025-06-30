import { Directive, ElementRef, inject, input, OnChanges, Renderer2 } from '@angular/core';
import { TechnologyName } from '@types';

@Directive({
	standalone: true,
	selector: '[appTechnologyColor]'
})
export class TechnologyColorDirective implements OnChanges {
	technology = input<string>('');

	private el = inject(ElementRef);
	private renderer = inject(Renderer2);

	private colorMap: Record<TechnologyName, { bg: string; text: string }> = {
		'IntelliJ IDEA': { bg: 'bg-pink-700/20', text: 'text-pink-700' },
		'Node.js': { bg: 'bg-green-600/20', text: 'text-green-600' },
		'Spring Boot': { bg: 'bg-green-500/20', text: 'text-green-500' },
		'Tailwind CSS': { bg: 'bg-sky-400/20', text: 'text-sky-500' },
		'VS Code': { bg: 'bg-blue-600/20', text: 'text-blue-600' },
		'Vue.js': { bg: 'bg-emerald-500/20', text: 'text-emerald-500' },
		AdonisJS: { bg: 'bg-indigo-700/20', text: 'text-indigo-700' },
		Angular: { bg: 'bg-red-600/20', text: 'text-red-600' },
		Bootstrap: { bg: 'bg-purple-600/20', text: 'text-purple-600' },
		'Bulma CSS': { bg: 'bg-teal-500/20', text: 'text-teal-500' },
		CSS3: { bg: 'bg-blue-600/20', text: 'text-blue-600' },
		CSS: { bg: 'bg-blue-600/20', text: 'text-blue-600' },
		Docker: { bg: 'bg-blue-500/20', text: 'text-blue-500' },
		Expo: { bg: 'bg-black/20', text: 'text-black' },
		Firebase: { bg: 'bg-amber-400/20', text: 'text-amber-500' },
		Flutter: { bg: 'bg-blue-400/20', text: 'text-blue-400' },
		Github: { bg: 'bg-gray-800/20', text: 'text-gray-800' },
		HTML5: { bg: 'bg-orange-600/20', text: 'text-orange-600' },
		Ionic: { bg: 'bg-indigo-500/20', text: 'text-indigo-500' },
		Java: { bg: 'bg-orange-600/20', text: 'text-orange-600' },
		JavaScript: { bg: 'bg-yellow-400/20', text: 'text-yellow-500' },
		Jest: { bg: 'bg-rose-500/20', text: 'text-rose-500' },
		Laravel: { bg: 'bg-red-500/20', text: 'text-red-500' },
		MongoDB: { bg: 'bg-emerald-700/20', text: 'text-emerald-700' },
		MySQL: { bg: 'bg-blue-700/20', text: 'text-blue-700' },
		NestJS: { bg: 'bg-rose-600/20', text: 'text-rose-600' },
		Next: { bg: 'bg-neutral-800/20', text: 'text-neutral-800' },
		Postgres: { bg: 'bg-sky-700/20', text: 'text-sky-700' },
		Postman: { bg: 'bg-orange-500/20', text: 'text-orange-500' },
		React: { bg: 'bg-cyan-500/20', text: 'text-cyan-500' },
		Redis: { bg: 'bg-red-700/20', text: 'text-red-700' },
		SCSS: { bg: 'bg-pink-600/20', text: 'text-pink-600' },
		Swagger: { bg: 'bg-lime-500/20', text: 'text-lime-500' },
		TypeScript: { bg: 'bg-blue-500/20', text: 'text-blue-500' }
	};

	ngOnChanges(): void {
		const color = this.colorMap[this.technology() as TechnologyName] ?? { bg: 'bg-gray-300/20', text: 'text-gray-500' };
		this.renderer.addClass(this.el.nativeElement, color.bg);
		this.renderer.addClass(this.el.nativeElement, color.text);
	}
}
