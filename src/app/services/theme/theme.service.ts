import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Theme } from '@types';

@Injectable({
	providedIn: 'root'
})
export class ThemeService {
	private theme: BehaviorSubject<Theme>;

	constructor(private localSt: LocalStorageService) {
		const themeSt = this.localSt.retrieve('theme');
		const defaultTheme: Theme = 'dark';
		if (!themeSt) {
			this.localSt.store('theme', defaultTheme);
		}
		this.theme = new BehaviorSubject<Theme>(themeSt ?? defaultTheme);
	}

	change(): Observable<Theme> {
		return this.theme.asObservable();
	}

	update(theme: Theme): void {
		this.theme.next(theme);
		this.localSt.store('theme', theme);
	}

	isTheme(theme: Theme): boolean {
		return this.theme.value === theme;
	}
}
