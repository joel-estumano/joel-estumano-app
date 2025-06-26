import { CommonModule } from '@angular/common';
import { Component, inject, Input, ViewChild } from '@angular/core';
import { GoogleMapsModule, MapInfoWindow } from '@angular/google-maps';
import { PROFILE, MAP_ID } from 'src/app/tokens';

@Component({
	selector: 'app-map',
	imports: [CommonModule, GoogleMapsModule],
	templateUrl: './map.component.html'
})
export class MapComponent {
	@ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

	protected profile = inject(PROFILE);
	private mapId = inject(MAP_ID);

	@Input({ required: false }) location: google.maps.LatLngLiteral = {
		lat: -1.7226223942693761,
		lng: -48.880203052430794
	};

	protected options: google.maps.MapOptions = {
		center: { lat: this.location.lat, lng: this.location.lng },
		zoom: 4,
		mapId: this.mapId
	};

	moveMap(event: google.maps.MapMouseEvent) {
		console.log(event.latLng?.toJSON());
	}

	move(event: google.maps.MapMouseEvent) {
		console.log(event.latLng?.toJSON());
	}
}
