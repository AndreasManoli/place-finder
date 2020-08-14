import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LatLng } from 'src/app/modules/auto-complete/interfaces/latLng.interface';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-wrapper',
  templateUrl: './search-wrapper.component.html',
  styleUrls: ['./search-wrapper.component.scss']
})
@UntilDestroy()
export class SearchWrapperComponent implements OnInit {
  constructor(private searchService: SearchService) {}
  @Output() center: EventEmitter<LatLng> = new EventEmitter();
  @Output() places: EventEmitter<any> = new EventEmitter();
  latLng: LatLng = null;
  type: string = null;
  radius = 10;

  ngOnInit(): void {}

  setCenter(latLng: LatLng) {
    this.searchService
      .getPlacesByLatLng(latLng, this.radius)
      .pipe(untilDestroyed(this))
      .subscribe(x => this.places.emit(x));
    this.center.emit(latLng);
    this.latLng = latLng;
  }

  setPlaces(type) {
    this.searchService
      .getPlacesByLatLngAndType(this.latLng, type, this.radius)
      .pipe(untilDestroyed(this))
      .subscribe(x => this.places.emit(x));
    this.type = type;
  }

  setRange(value: number) {
    this.radius = value;
    if (!!this.latLng && !!this.type) {
      this.setPlaces(this.type);
    } else if (!!this.latLng) {
      this.setCenter(this.latLng);
    }
  }
}
