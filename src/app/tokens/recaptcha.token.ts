import { InjectionToken } from '@angular/core';

export const RECAPTCHA = new InjectionToken<string>('recaptcha.token', {
	factory: () => '6LclE_gpAAAAAB2Q6wrP-gXL6jiD9Du5boiiF6s9'
});
