import { Component, input } from '@angular/core';

@Component({
	selector: 'app-avatar',
	templateUrl: './avatar.component.html'
})
export class AvatarComponent {
	src = input('img/profile-avatar.webp');
	alt = input('Joel Estumano');
}
