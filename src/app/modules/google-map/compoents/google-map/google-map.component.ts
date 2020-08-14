import { Component, Inject, Input, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
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
@UntilDestroy()
export class GoogleMapComponent {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  @Input() set Center(value: LatLng) {
    this.center = value;
  }
  @Input() set PointsOfInterest(value) {
    this.data = value;
  }

  constructor(private mapsService: MapsService, @Inject(APP_CONFIG) private config: AppConfig) {}

  data: Partial<{}>;
  center: google.maps.LatLngLiteral;

  options: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8
  };

  content: { name: string; photos: any; openNow: boolean; profilePhoto: string; address: string; phone: string; rating: string } = null;

  openInfoWindow = (marker: MapMarker, item: { place_id: string }): void => {
    this.content = null;
    this.mapsService
      .getDetails(item.place_id)
      .pipe(untilDestroyed(this))
      .subscribe(x => {
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
  };

  trackById = (index: number, value: string): string => index + value;
}
