import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { LatLng } from '../../interfaces/latLng.interface';
import { Prediction } from '../../interfaces/prediction.interface';
import { AutoCompleteService } from '../../services/auto-complete.service';

@Component({
  selector: 'app-auto-complete-input',
  templateUrl: './auto-complete-input.component.html',
  styleUrls: ['./auto-complete-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@UntilDestroy()
export class AutoCompleteInputComponent {
  @Output() latLng: EventEmitter<LatLng> = new EventEmitter();

  options$: Observable<Prediction[]> = of(null);
  private search = '';

  get Search(): string {
    return this.search;
  }
  set Search(value: string) {
    if (this.search.trim() !== value.trim()) {
      this.options$ = this.autoCompleteService.getPredictions(value);
    }
    this.search = value;
  }

  constructor(private autoCompleteService: AutoCompleteService) {}

  trackById = (_: number, value: Prediction): string => value.placeId;

  setDetails = (value: string): void => {
    this.autoCompleteService
      .getLatLng(value)
      .pipe(untilDestroyed(this))
      .subscribe(x => this.latLng.emit(x));
  };
}
