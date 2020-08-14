import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { discardPeriodicTasks, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { APP_CONFIG, PLACE_FINDER_CONFIG } from 'src/app/providers/config.provider';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: APP_CONFIG, useValue: PLACE_FINDER_CONFIG }]
    });
    service = TestBed.inject(SearchService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getPlacesByLatLng execute get call', fakeAsync(() => {
    let result = null;
    const spy = spyOn(http, 'get').and.returnValue(of({ results: [{}] }));
    service.getPlacesByLatLng({ lat: 1, lng: 1 }, 0).subscribe(x => (result = x));
    expect(spy).toHaveBeenCalled();
    expect(result).toEqual([{}]);

    tick(100);
    flushMicrotasks();
    discardPeriodicTasks();
  }));

  it('should getPlacesByLatLngAndType execute get call', fakeAsync(() => {
    let result = null;

    const spy = spyOn(http, 'get').and.returnValue(of({ results: [{}] }));
    service.getPlacesByLatLngAndType({ lat: 1, lng: 1 }, 'type', 0).subscribe(x => (result = x));
    expect(spy).toHaveBeenCalled();
    expect(result).toEqual([{}]);
    tick(100);
    flushMicrotasks();
    discardPeriodicTasks();
  }));
});
