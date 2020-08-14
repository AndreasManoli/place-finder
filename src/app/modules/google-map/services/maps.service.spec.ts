import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { discardPeriodicTasks, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { APP_CONFIG, PLACE_FINDER_CONFIG } from 'src/app/providers/config.provider';
import { MapsService } from './maps.service';

describe('MapsService', () => {
  let service: MapsService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: APP_CONFIG, useValue: PLACE_FINDER_CONFIG }]
    });
    service = TestBed.inject(MapsService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getDetails execute get call', fakeAsync(() => {
    let result = null;
    const spy = spyOn(http, 'get').and.returnValue(of({ result: null }));
    service.getDetails('test').subscribe(x => (result = x));
    expect(spy).toHaveBeenCalled();
    expect(result).toEqual(null);

    tick(100);
    flushMicrotasks();
    discardPeriodicTasks();
  }));
});
