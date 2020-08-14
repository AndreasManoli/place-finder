import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { RangeSelectorComponent } from './components/range-selector/range-selector.component';

const components = [RangeSelectorComponent];

@NgModule({
  declarations: components,
  imports: [CommonModule, MatSliderModule, TranslateModule, MatIconModule, MatTooltipModule],
  entryComponents: components,
  exports: components
})
export class RangeSelectorModule {}
