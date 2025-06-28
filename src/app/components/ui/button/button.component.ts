import { NgClass } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { cn } from 'src/app/utils';

@Component({
	selector: 'app-button',
	imports: [NgClass],
	templateUrl: './button.component.html'
})
export class ButtonComponent {
	type = input<'button' | 'submit' | 'reset'>('button');
	title = input('#');
	disabled = input(false);
	classes = input<string>('');

	@Input() ariaInvalid = false;

	variant = input<'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'>('default');
	size = input<'default' | 'sm' | 'lg' | 'icon'>('default');

	getButtonClasses(): string {
		return cn(
			"inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
			this.variants(),
			this.getSizeClasses(),
			this.classes()
		);
	}

	private variants(): string {
		const variants: Record<string, string> = {
			default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
			destructive:
				'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
			outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
			secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
			ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
			link: 'text-primary underline-offset-4 hover:underline'
		};
		return variants[this.variant()] || variants['default'];
	}

	private getSizeClasses(): string {
		const sizes: Record<string, string> = {
			default: 'h-9 px-4 py-2 has-[>svg]:px-3',
			sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
			lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
			icon: 'size-9'
		};
		return sizes[this.size()] || sizes['default'];
	}
}
