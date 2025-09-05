import { ButtonComponent } from '@shared/ui/button/button.component';
import { ClipboardModule, IClipboardResponse } from 'ngx-clipboard';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ContactFormComponent } from '@shared/components/contact-form/contact-form.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import { LinkComponent } from '@shared/ui/link/link.component';
import { PROFILE } from '@core/tokens';
import { SectionComponent } from '@shared/components/section/section.component';

@Component({
	selector: 'app-contact',
	imports: [SectionComponent, IconComponent, ContactFormComponent, ClipboardModule, LinkComponent, ButtonComponent],
	templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
	profile = inject(PROFILE);

	suportaWebShare = signal<boolean>(false);

	emailIsCopied = signal<boolean>(false);
	phoneIsCopied = signal<boolean>(false);

	ngOnInit(): void {
		this.suportaWebShare.set(!!navigator.share);
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
					console.log('share successfully!');
				})
				.catch((error) => {
					console.error('sharing error:', error);
				});
		}
	}
}
