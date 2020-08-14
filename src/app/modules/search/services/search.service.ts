import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppConfig } from 'src/app/interfaces/config.interface';
import { APP_CONFIG } from 'src/app/providers/config.provider';
import { LatLng } from '../../auto-complete/interfaces/latLng.interface';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {}

  getPlacesByLatLng = (value: LatLng, radius: number): Observable<any> =>
    this.http.get<any>(`${this.config.urls.nearBySearch}?location=${value.lat},${value.lng}&radius=${radius}`).pipe(
      switchMap(x =>
        of(
          map(x.results, z => {
            return z;
          })
        )
      )
    );

  getPlacesByLatLngAndType = (value: LatLng, type: string, radius: number): Observable<any> =>
    this.http.get<any>(`${this.config.urls.nearBySearch}?location=${value.lat},${value.lng}&type=${type}&radius=${radius}`).pipe(
      switchMap(x =>
        of(
          map(x.results, z => {
            return z;
          })
        )
      )
    );
}
