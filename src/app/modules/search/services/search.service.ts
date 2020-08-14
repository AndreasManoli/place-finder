import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import * as _ from 'lodash-es';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AppConfig } from 'src/app/interfaces/config.interface';
import { APP_CONFIG } from 'src/app/providers/config.provider';
import { LatLng } from '../../auto-complete/interfaces/latLng.interface';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {}

  getPlacesByLatLngAndType = (value: LatLng, type: string, radius: number): Observable<any> =>
    this.http.get<any>(`${this.config.urls.nearBySearch}?location=${value.lat},${value.lng}&type=${type}&radius=${radius}`).pipe(
      switchMap(x =>
        of(
          _.map(x.results, z => {
            return z;
          })
        )
      ),
      catchError(error => {
        console.log(error);
        return of(null);
      })
    );
}
