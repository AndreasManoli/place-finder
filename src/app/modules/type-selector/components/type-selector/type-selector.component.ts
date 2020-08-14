import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AppConfig } from 'src/app/interfaces/config.interface';
import { APP_CONFIG } from 'src/app/providers/config.provider';

export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-type-selector',
  templateUrl: './type-selector.component.html',
  styleUrls: ['./type-selector.component.scss']
})
export class TypeSelectorComponent {
  @Output() type: EventEmitter<string> = new EventEmitter();
  @Input() disabled = true;

  private selectedValue = '';
  set Type(value: string) {
    this.type.emit(value);
    this.selectedValue = value;
  }
  get Type(): string {
    return this.selectedValue;
  }
  readonly availableTypes = this.config.types;

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {}
}
