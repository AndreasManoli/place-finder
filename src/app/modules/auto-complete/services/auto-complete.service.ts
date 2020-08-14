import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppConfig } from 'src/app/interfaces/config.interface';
import { APP_CONFIG } from 'src/app/providers/config.provider';
import { LatLng } from '../interfaces/latLng.interface';
import { Prediction } from '../interfaces/prediction.interface';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {}

  getPredictions = (value: string): Observable<Prediction[]> =>
    this.http
      .get<Partial<{ predictions: { description: string; place_id: string } }>>(`${this.config.urls.placesAutoComplete}?input=${value}`)
      .pipe(
        switchMap(x =>
          of(
            map(x.predictions, z => {
              return { description: z.description, placeId: z.place_id };
            })
          )
        )
      );

  getLatLng = (placeId: string): Observable<LatLng> =>
    this.http
      .get<Partial<{ result: { geometry: { location: LatLng } } }>>(`${this.config.urls.placeLatLng}&place_id=${placeId}`)
      .pipe(switchMap(x => of(x.result.geometry.location)));
}
