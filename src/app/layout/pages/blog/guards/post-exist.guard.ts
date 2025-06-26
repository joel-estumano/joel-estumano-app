import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { posts } from '../constants';

export const postExistGuard: CanActivateFn = (route) => {
	const router = inject(Router);
	const id = route.paramMap.get('id');
	const exists = posts.some((p) => p.id === id);

	if (!exists) {
		router.navigate(['/blog']);
		return false;
	}

	return true;
};
