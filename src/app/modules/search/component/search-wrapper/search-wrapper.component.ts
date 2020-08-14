import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AppConfig } from 'src/app/interfaces/config.interface';
import { LatLng } from 'src/app/modules/auto-complete/interfaces/latLng.interface';
import { APP_CONFIG } from 'src/app/providers/config.provider';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-wrapper',
  templateUrl: './search-wrapper.component.html',
  styleUrls: ['./search-wrapper.component.scss']
})
@UntilDestroy()
export class SearchWrapperComponent {
  @Output() center: EventEmitter<LatLng> = new EventEmitter();
  @Output() places: EventEmitter<any> = new EventEmitter();
  latLng: LatLng = null;
  type: string = null;
  radius = this.config.radius.default;

  constructor(private searchService: SearchService, @Inject(APP_CONFIG) private config: AppConfig) {}

  setCenter = (latLng: LatLng): void => {
    this.searchService
      .getPlacesByLatLng(latLng, this.radius)
      .pipe(untilDestroyed(this))
      .subscribe(x => this.places.emit(x));
    this.center.emit(latLng);
    this.latLng = latLng;
  };

  setPlaces = (type: string): void => {
    this.searchService
      .getPlacesByLatLngAndType(this.latLng, type, this.radius)
      .pipe(untilDestroyed(this))
      .subscribe(x => this.places.emit(x));
    this.type = type;
  };

  setRange = (value: number): void => {
    this.radius = value;
    if (!!this.latLng && !!this.type) {
      this.setPlaces(this.type);
    } else if (!!this.latLng) {
      this.setCenter(this.latLng);
    }
  };
}
