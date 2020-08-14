import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { AutoCompleteInputComponent } from './components/auto-complete-input/auto-complete-input.component';
import { AutoCompleteService } from './services/auto-complete.service';

const components = [AutoCompleteInputComponent];

@NgModule({
  declarations: components,
  entryComponents: components,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    TranslateModule,
    MatTooltipModule
  ],
  exports: components,
  providers: [AutoCompleteService]
})
export class AutoCompleteModule {}
