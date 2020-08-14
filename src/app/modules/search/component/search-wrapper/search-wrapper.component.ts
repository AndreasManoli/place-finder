import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import * as _ from 'lodash-es';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/interfaces/config.interface';
import { LatLng } from 'src/app/modules/auto-complete/interfaces/latLng.interface';
import { APP_CONFIG } from 'src/app/providers/config.provider';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-wrapper',
  templateUrl: './search-wrapper.component.html',
  styleUrls: ['./search-wrapper.component.scss']
})
@UntilDestroy({ checkProperties: true })
export class SearchWrapperComponent {
  @Output() center: EventEmitter<LatLng> = new EventEmitter();
  @Output() places: EventEmitter<any> = new EventEmitter();
  latLng: LatLng = null;
  type = 'all';
  radius = this.config.radius.default;
  private setPlacesSubscription: Subscription;

  constructor(private searchService: SearchService, @Inject(APP_CONFIG) private config: AppConfig) {}

  setCenter = (latLng: LatLng): void => {
    this.center.emit(latLng);
    this.latLng = latLng;
    this.updatePlaces();
  };

  setPlaces = (type: string): void => {
    this.type = type;
    this.updatePlaces();
  };

  setRange = (value: number): void => {
    this.radius = value;
    this.updatePlaces();
  };

  updatePlaces = (): void => {
    _.attempt(() => this.setPlacesSubscription?.unsubscribe());
    this.setPlacesSubscription = this.searchService
      .getPlacesByLatLngAndType(this.latLng, this.type, this.radius)
      .subscribe(x => this.places.emit(x));
  };
}
