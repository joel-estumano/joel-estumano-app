import { InjectionToken } from '@angular/core';

export const MAP_ID = new InjectionToken<string>('map.token', {
	factory: () => 'DEMO_MAP_ID'
});
