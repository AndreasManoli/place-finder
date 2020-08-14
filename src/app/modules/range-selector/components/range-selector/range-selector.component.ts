import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AppConfig } from 'src/app/interfaces/config.interface';
import { APP_CONFIG } from 'src/app/providers/config.provider';

@Component({
  selector: 'app-range-selector',
  templateUrl: './range-selector.component.html',
  styleUrls: ['./range-selector.component.scss']
})
export class RangeSelectorComponent {
  @Output() radius: EventEmitter<number> = new EventEmitter();
  @Input() disabled = true;

  min: number = null;
  max: number = null;
  default: number = null;

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {
    this.min = this.config.radius.min;
    this.max = this.config.radius.max;
    this.default = this.config.radius.default;
  }

  formatLabel = (value: number): string => (value >= 1000 ? Math.round(value / 1000) + 'k' : '' + value);

  radiusChange = (radius: Partial<{ value: number }>): void => {
    this.radius.emit(radius.value);
  };
}
