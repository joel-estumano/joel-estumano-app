import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input, model } from "@angular/core";
import { IconComponent, IconName } from "../icon/icon.component";
import { ThemeService } from "src/app/services/theme/theme.service";

@Component({
	selector: "app-switch",
	imports: [NgClass, IconComponent],
	templateUrl: "./switch.component.html",
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchComponent {
	private themeService = inject(ThemeService);

	checked = model<boolean>(this.themeService.isTheme("dark"));
	disabled = input<boolean>(false);
	iconChecked = input<IconName | undefined>(undefined);
	iconUnchecked = input<IconName | undefined>(undefined);

	toggleSwitch() {
		if (!this.disabled()) {
			this.checked.update((value) => !value);
			this.themeService.update(this.checked() ? "dark" : "light");
		}
	}
}
