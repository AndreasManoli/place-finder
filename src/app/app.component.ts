import { Component } from '@angular/core';
import { LatLng } from './modules/auto-complete/interfaces/latLng.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'place-finder';
  center: LatLng;
  places: any;

  setCenter(value: LatLng) {
    this.center = value;
  }
  setPlaces(value: LatLng) {
    this.places = value;
  }
}
