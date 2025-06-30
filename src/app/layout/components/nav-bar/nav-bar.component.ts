import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { DrawerComponent } from '../drawer/drawer.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkComponent } from '@shared/ui/router-link/router-link.component';
import { SwitchComponent } from '../switch/switch.component';

@Component({
	selector: 'app-nav-bar',
	imports: [DrawerComponent, NgClass, IconComponent, RouterLink, SwitchComponent, RouterLinkComponent],
	templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {
	@ViewChild(DrawerComponent) drawer!: DrawerComponent;
	protected screenIsSmall = signal<boolean>(false);
	protected drawerIsOpen = signal<boolean>(false);

	protected links = [
		{ label: 'Home', path: '/', exact: true },
		{ label: 'Blog', path: '/blog', exact: false },
		{ label: 'Contato', path: '/contato', exact: true }
	];

	constructor(private breakpointObserver: BreakpointObserver) {}

	ngOnInit() {
		this.breakpointObserver.observe(['(max-width: 640px)']).subscribe((result) => {
			this.screenIsSmall.set(result.matches);
		});
	}
}
