import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppConfig } from 'src/app/interfaces/config.interface';
import { APP_CONFIG } from 'src/app/providers/config.provider';
import { LatLng } from '../../auto-complete/interfaces/latLng.interface';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {}

  getDetails = (placeId: string): Observable<any> =>
    this.http
      .get<Partial<{ result: { geometry: { location: LatLng } } }>>(`${this.config.urls.placeDetails}&place_id=${placeId}`)
      .pipe(switchMap(x => of(x.result)));
}
