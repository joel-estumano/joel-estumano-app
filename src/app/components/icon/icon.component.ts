import { Component, input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import * as bootstrapIcons from '@ng-icons/bootstrap-icons';
import * as boxiconsLogos from '@ng-icons/boxicons/logos';
import * as boxiconsRegular from '@ng-icons/boxicons/regular';
import * as boxiconsSolid from '@ng-icons/boxicons/solid';
import * as heroiconsRegular from '@ng-icons/heroicons/outline';
import * as heroiconsSolid from '@ng-icons/heroicons/solid';

import * as appIcons from './logos';

export type IconName =
	| keyof typeof appIcons
	| keyof typeof bootstrapIcons
	| keyof typeof boxiconsLogos
	| keyof typeof boxiconsRegular
	| keyof typeof boxiconsSolid
	| keyof typeof heroiconsRegular
	| keyof typeof heroiconsSolid;

const mergeIcons = {
	...appIcons,
	...bootstrapIcons,
	...boxiconsLogos,
	...boxiconsRegular,
	...boxiconsSolid,
	...heroiconsRegular,
	...heroiconsSolid
};

@Component({
	selector: 'app-icon',
	imports: [NgIconComponent],
	templateUrl: './icon.component.html',
	providers: [provideIcons(mergeIcons)]
})
export class IconComponent {
	icon = input<IconName>();
	class = input<string>();
}
