import { Injectable, inject } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";
import { PROFILE } from "src/app/tokens";

@Injectable({ providedIn: "root" })
export class CustomTitleStrategy extends TitleStrategy {
	private profile = inject(PROFILE);

	constructor(private titleService: Title) {
		super();
	}

	override updateTitle(snapshot: RouterStateSnapshot): void {
		const title = this.buildTitle(snapshot);
		if (title) {
			this.titleService.setTitle(`${this.profile.name} | ${title}`);
		} else {
			this.titleService.setTitle(`${this.profile.name}`);
		}
	}
}
