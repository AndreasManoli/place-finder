import { Component, EventEmitter, Input, Output } from '@angular/core';
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

@Component({
  selector: 'app-range-selector',
  template: 'range-selector.component.html'
})
class MockRangeSelectorComponent {
  @Output() radius: EventEmitter<number> = new EventEmitter();
  @Input() disabled = true;
}
@Component({
  selector: 'app-auto-complete-input',
  template: 'auto-complete-input.component'
})
class MockAutoCompleteInputComponent {
  @Output() latLng = new EventEmitter();
}

@Component({
  selector: 'app-type-selector',
  template: 'type-selector.component.html'
})
class MockTypeSelectorComponent {
  @Output() type: EventEmitter<string> = new EventEmitter();
  @Input() disabled = true;
}

describe('SearchWrapperComponent', () => {
  let component: SearchWrapperComponent;
  let fixture: ComponentFixture<SearchWrapperComponent>;
  let searchService: SearchService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchWrapperComponent, MockAutoCompleteInputComponent, MockRangeSelectorComponent, MockTypeSelectorComponent],
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
    const spy = spyOn(searchService, 'getPlacesByLatLngAndType').and.returnValue(of({}));
    component.setCenter({ lat: 1, lng: 1 });
    expect(spy).toHaveBeenCalled();
  });

  it('should call setPlaces ', () => {
    const spy = spyOn(searchService, 'getPlacesByLatLngAndType').and.returnValue(of({}));
    component.setPlaces('type');
    expect(spy).toHaveBeenCalled();
  });

  it('should call setRange', () => {
    const spy = spyOn(searchService, 'getPlacesByLatLngAndType').and.returnValue(of({}));
    component.setRange(10);
    expect(spy).toHaveBeenCalled();
  });
});
