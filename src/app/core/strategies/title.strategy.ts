import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { PROFILE } from 'src/app/core/tokens';

@Injectable({ providedIn: 'root' })
export class CustomTitleStrategy extends TitleStrategy {
	private profile = inject(PROFILE);
	private title = inject(Title);

	constructor() {
		super();
	}

	override updateTitle(snapshot: RouterStateSnapshot): void {
		const title = this.buildTitle(snapshot);
		if (title) {
			this.title.setTitle(`${this.profile.name} | ${title}`);
		} else {
			this.title.setTitle(`${this.profile.name}`);
		}
	}
}
