import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { LatLng } from 'src/app/modules/auto-complete/interfaces/latLng.interface';
import { APP_CONFIG, PLACE_FINDER_CONFIG } from 'src/app/providers/config.provider';
import { MapsService } from '../../services/maps.service';
import { GoogleMapComponent } from './google-map.component';

class MockMapsService {
  getDetails = (placeId: string): Observable<Partial<{ geometry: { location: LatLng } }>> => of(null);
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'google-map',
  template: 'google-map'
})
// tslint:disable-next-line:component-class-suffix
class MockGoogleMap {
  @Input() center;
}

describe('GoogleMapComponent', () => {
  let component: GoogleMapComponent;
  let fixture: ComponentFixture<GoogleMapComponent>;
  let mapsService: MapsService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GoogleMapComponent, MockGoogleMap],
      providers: [
        { provide: APP_CONFIG, useValue: PLACE_FINDER_CONFIG },
        { provider: MapsService, useClass: MockMapsService }
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mapsService = TestBed.inject(MapsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should set center'`, () => {
    component.Center = { lat: 1, lng: 2 };
    expect(component.center).toEqual({ lat: 1, lng: 2 });
  });

  it(`should set PointsOfInterest'`, () => {
    component.PointsOfInterest = [];
    expect(component.data).toEqual([]);
  });

  it(`should call trackById '`, () => {
    expect(component.trackById(1, '1')).toEqual('11');
  });

  it(`should set openInfoWindow with null input`, fakeAsync(() => {
    const spy = spyOn(mapsService, 'getDetails').and.returnValue(of(null));
    component.openInfoWindow({} as any, { place_id: '1' });
    expect(spy).toHaveBeenCalled();
    tick(100);
    flushMicrotasks();
    discardPeriodicTasks();
  }));

  it(`should set openInfoWindow with input`, fakeAsync(() => {
    const spy = spyOn(mapsService, 'getDetails').and.returnValue(
      of({
        name: 'name',
        formatted_address: 'formatted_address',
        icon: 'icon',
        formatted_phone_number: 'formatted_phone_number',
        rating: 'rating',
        opening_hours: { open_now: true },
        photos: []
      })
    );
    component.openInfoWindow({} as any, { place_id: '1' });
    expect(spy).toHaveBeenCalled();
    tick(100);
    flushMicrotasks();
    discardPeriodicTasks();
  }));
});
