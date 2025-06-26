import { Directive, ElementRef, inject, input, OnChanges, Renderer2 } from "@angular/core";

@Directive({
	standalone: true,
	selector: "[appAlphabetColor]"
})
export class AlphabetColorDirective implements OnChanges {
	alphabetColor = input<string>("");

	protected el = inject(ElementRef);
	protected renderer = inject(Renderer2);

	protected styleMap: Record<string, { bg: string; text: string }> = {
		a: { bg: "bg-pink-500/20", text: "text-pink-500" },
		b: { bg: "bg-red-500/20", text: "text-red-500" },
		c: { bg: "bg-orange-500/20", text: "text-orange-500" },
		d: { bg: "bg-amber-500/20", text: "text-amber-500" },
		e: { bg: "bg-yellow-500/20", text: "text-yellow-500" },
		f: { bg: "bg-lime-500/20", text: "text-lime-500" },
		g: { bg: "bg-green-500/20", text: "text-green-500" },
		h: { bg: "bg-emerald-500/20", text: "text-emerald-500" },
		i: { bg: "bg-teal-500/20", text: "text-teal-500" },
		j: { bg: "bg-cyan-500/20", text: "text-cyan-500" },
		k: { bg: "bg-stone-500/20", text: "text-stone-500" },
		l: { bg: "bg-zinc-500/20", text: "text-zinc-500" },
		m: { bg: "bg-indigo-500/20", text: "text-indigo-500" },
		n: { bg: "bg-violet-500/20", text: "text-violet-500" },
		o: { bg: "bg-purple-500/20", text: "text-purple-500" },
		p: { bg: "bg-fuchsia-500/20", text: "text-fuchsia-500" },
		q: { bg: "bg-rose-500/20", text: "text-rose-500" },
		r: { bg: "bg-sky-500/20", text: "text-sky-500" },
		s: { bg: "bg-amber-600/20", text: "text-amber-600" },
		t: { bg: "bg-blue-500/20", text: "text-blue-500" },
		u: { bg: "bg-slate-500/20", text: "text-slate-500" },
		v: { bg: "bg-gray-500/20", text: "text-gray-500" },
		w: { bg: "bg-orange-600/20", text: "text-orange-600" },
		x: { bg: "bg-neutral-500/20", text: "text-neutral-500" },
		y: { bg: "bg-yellow-600/20", text: "text-yellow-600" },
		z: { bg: "bg-red-600/20", text: "text-red-600" }
	};

	ngOnChanges(): void {
		const firstChar = this.alphabetColor().charAt(0)?.toLowerCase();
		const color = this.styleMap[firstChar] ?? { bg: "bg-gray-500/20", text: "text-gray-500" };
		this.renderer.addClass(this.el.nativeElement, color.bg);
		this.renderer.addClass(this.el.nativeElement, color.text);
	}
}
