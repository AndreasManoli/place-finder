import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { TypeSelectorComponent } from './components/type-selector/type-selector.component';

const components = [TypeSelectorComponent];

@NgModule({
  declarations: components,
  entryComponents: components,
  imports: [CommonModule, MatSelectModule, FormsModule, MatInputModule, TranslateModule, MatTooltipModule, MatIconModule],
  exports: components
})
export class TypeSelectorModule {}
