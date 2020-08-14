import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AppConfig } from 'src/app/interfaces/config.interface';
import { APP_CONFIG } from 'src/app/providers/config.provider';
import { InputPlaceDetails } from '../interfaces/input-place-details.interface';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {}

  getDetails = (placeId: string): Observable<InputPlaceDetails> =>
    this.http.get<Partial<{ result: InputPlaceDetails }>>(`${this.config.urls.placeDetails}&place_id=${placeId}`).pipe(
      switchMap(x => of(x.result)),
      catchError(error => {
        console.log(error);
        return of(null);
      })
    );
}
