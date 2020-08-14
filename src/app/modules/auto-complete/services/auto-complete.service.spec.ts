import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { discardPeriodicTasks, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { APP_CONFIG, PLACE_FINDER_CONFIG } from 'src/app/providers/config.provider';
import { AutoCompleteService } from './auto-complete.service';

describe('AutoCompleteService', () => {
  let service: AutoCompleteService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: APP_CONFIG, useValue: PLACE_FINDER_CONFIG }]
    });
    service = TestBed.inject(AutoCompleteService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getLatLng execute get call', fakeAsync(() => {
    let result = null;
    const spy = spyOn(http, 'get').and.returnValue(of({ result: { geometry: { location: { lat: 1, lng: 1 } } } }));
    service.getLatLng('test').subscribe(x => (result = x));
    expect(spy).toHaveBeenCalled();
    expect(result).toEqual({ lat: 1, lng: 1 });

    tick(100);
    flushMicrotasks();
    discardPeriodicTasks();
  }));

  it('should getPredictions execute get call', fakeAsync(() => {
    let result = null;

    const spy = spyOn(http, 'get').and.returnValue(of({ predictions: [{ description: '', place_id: '' }] }));
    service.getPredictions('test').subscribe(x => (result = x));
    expect(spy).toHaveBeenCalled();
    expect(result).toEqual([{ description: '', placeId: '' }]);
    tick(100);
    flushMicrotasks();
    discardPeriodicTasks();
  }));
});
