import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { LatLng } from 'src/app/modules/auto-complete/interfaces/latLng.interface';
import { APP_CONFIG, PLACE_FINDER_CONFIG } from 'src/app/providers/config.provider';
import { SearchService } from '../../services/search.service';
import { SearchWrapperComponent } from './search-wrapper.component';

export class MockSearchService {
  getPlacesByLatLng = (value: LatLng, radius: number): Observable<any> => of(null);
  getPlacesByLatLngAndType = (value: LatLng, type: string, radius: number): Observable<any> => of(null);
}

describe('SearchWrapperComponent', () => {
  let component: SearchWrapperComponent;
  let fixture: ComponentFixture<SearchWrapperComponent>;
  let searchService: SearchService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchWrapperComponent],
      providers: [
        { provide: SearchService, useClass: MockSearchService },
        { provide: APP_CONFIG, useValue: PLACE_FINDER_CONFIG }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    searchService = TestBed.inject(SearchService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setCenter', () => {
    const spy = spyOn(searchService, 'getPlacesByLatLng').and.returnValue(of({}));
    component.setCenter({ lat: 1, lng: 1 });
    expect(spy).toHaveBeenCalled();
  });

  it('should call setPlaces ', () => {
    const spy = spyOn(searchService, 'getPlacesByLatLngAndType').and.returnValue(of({}));
    component.setPlaces('type');
    expect(spy).toHaveBeenCalled();
  });
  it('should no call', () => {
    const spySetCenter = spyOn(component, 'setCenter').and.stub();
    const spySetPlaces = spyOn(component, 'setPlaces').and.stub();
    component.latLng = null;
    component.type = null;
    component.setRange(10);
    expect(spySetCenter).not.toHaveBeenCalled();
    expect(spySetPlaces).not.toHaveBeenCalled();
  });
  it('should call setCenter', () => {
    const spySetCenter = spyOn(component, 'setCenter').and.stub();
    const spySetPlaces = spyOn(component, 'setPlaces').and.stub();
    component.latLng = { lat: 1, lng: 1 };
    component.type = null;
    component.setRange(10);
    expect(spySetCenter).toHaveBeenCalled();
    expect(spySetPlaces).not.toHaveBeenCalled();
  });

  it('should call setPlaces', () => {
    const spySetCenter = spyOn(component, 'setCenter').and.stub();
    const spySetPlaces = spyOn(component, 'setPlaces').and.stub();
    component.latLng = { lat: 1, lng: 1 };
    component.type = 'type';
    component.setRange(10);
    expect(spySetCenter).not.toHaveBeenCalled();
    expect(spySetPlaces).toHaveBeenCalled();
  });
});
