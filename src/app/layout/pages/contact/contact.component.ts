import { Component, inject, OnInit, signal } from "@angular/core";
import { ContactFormComponent } from "@components/contact-form/contact-form.component";
import { ClipboardModule, IClipboardResponse } from "ngx-clipboard";
import { HttpService } from "src/app/services/http/http.service";
import { HttpErrorResponse } from "@angular/common/http";
import { IconComponent } from "@components/icon/icon.component";
import { SectionComponent } from "@components/section/section.component";
import { PROFILE } from "src/app/tokens";
import { LinkComponent } from "@components/ui/link/link.component";
import { ButtonComponent } from "@components/ui/button/button.component";

@Component({
	selector: "app-contact",
	imports: [SectionComponent, IconComponent, ContactFormComponent, ClipboardModule, LinkComponent, ButtonComponent],
	templateUrl: "./contact.component.html"
})
export class ContactComponent implements OnInit {
	profile = inject(PROFILE);

	suportaWebShare = signal<boolean>(false);

	emailIsCopied = signal<boolean>(false);
	phoneIsCopied = signal<boolean>(false);

	constructor(private httpService: HttpService) {}

	ngOnInit(): void {
		this.suportaWebShare.set(!!navigator.share);
		this.httpService.get<string>("ping").subscribe({
			next: (pong: string) => {
				console.log(pong);
			},
			error: (error: HttpErrorResponse) => {
				console.error(error);
			}
		});
	}

	emailCopied(event: IClipboardResponse) {
		this.emailIsCopied.set(event.isSuccess);
		this.phoneIsCopied.set(!event.isSuccess);
	}

	phoneCopied(event: IClipboardResponse) {
		this.phoneIsCopied.set(event.isSuccess);
		this.emailIsCopied.set(!event.isSuccess);
	}

	share(value: string): void {
		if (this.suportaWebShare()) {
			navigator
				.share({
					title: this.profile.name,
					text: value
				})
				.then(() => {
					console.log("share successfully!");
				})
				.catch((error) => {
					console.error("sharing error:", error);
				});
		}
	}
}
