import { Component, EventEmitter, Output } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import * as _ from 'lodash-es';
import { Observable, of, Subscription } from 'rxjs';
import { LatLng } from '../../interfaces/latLng.interface';
import { Prediction } from '../../interfaces/prediction.interface';
import { AutoCompleteService } from '../../services/auto-complete.service';

@Component({
  selector: 'app-auto-complete-input',
  templateUrl: './auto-complete-input.component.html',
  styleUrls: ['./auto-complete-input.component.scss']
})
@UntilDestroy({ checkProperties: true })
export class AutoCompleteInputComponent {
  @Output() latLng: EventEmitter<LatLng> = new EventEmitter();
  options$: Observable<Prediction[]> = of(null);
  private search = '';
  private subscription: Subscription;

  get Search(): string {
    return this.search;
  }
  set Search(value: string) {
    if (this.search?.trim() !== value.trim()) {
      this.options$ = this.autoCompleteService.getPredictions(value);
    }
    this.search = value;
  }

  constructor(private autoCompleteService: AutoCompleteService) {}

  trackById = (index: number, value: Prediction): string => value.placeId;

  setDetails = (value: string): void => {
    _.attempt(() => this.subscription?.unsubscribe());
    this.subscription = this.autoCompleteService.getLatLng(value).subscribe(x => this.latLng.emit(x));
  };
}
