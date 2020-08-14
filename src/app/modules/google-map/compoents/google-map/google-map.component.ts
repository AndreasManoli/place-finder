import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import * as _ from 'lodash-es';
import { AppConfig } from 'src/app/interfaces/config.interface';
import { LatLng } from 'src/app/modules/auto-complete/interfaces/latLng.interface';
import { APP_CONFIG } from 'src/app/providers/config.provider';
import { MapsService } from '../../services/maps.service';
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  @Input() set Center(value: LatLng) {
    this.center = value;
  }
  @Input() set PointsOfInterest(value) {
    this.data = value;
  }

  constructor(private mapsService: MapsService, @Inject(APP_CONFIG) private config: AppConfig) {}

  data;
  center: google.maps.LatLngLiteral;

  options: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8
  };

  content: { name: string; photos: any; openNow?: boolean; profilePhoto: string; address: string; phone: string; rating: string } = null;
  // Todo:
  openInfoWindow(marker: MapMarker, item) {
    this.content = null;
    this.mapsService.getDetails(item.place_id).subscribe(x => {
      this.content = {
        name: x.name,
        address: x.formatted_address,
        profilePhoto: x.icon,
        phone: x.formatted_phone_number,
        rating: x.rating,
        openNow: x?.opening_hours?.open_now,
        photos: _.map(x.photos, z => this.config.urls.photo + z.photo_reference + '&key=' + this.config.general.apiKey)
      };
    });
    this.infoWindow.open(marker);
  }

  ngOnInit(): void {}
}
