import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleMapComponent } from './compoents/google-map/google-map.component';
import { MapsService } from './services/maps.service';

const components = [GoogleMapComponent];

@NgModule({
  declarations: components,
  imports: [CommonModule, GoogleMapsModule, TranslateModule, MatTabsModule, MatProgressSpinnerModule],
  providers: [MapsService],
  entryComponents: components,
  exports: components
})
export class GoogleMapModule {}
