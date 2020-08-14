import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { LatLng } from '../../interfaces/latLng.interface';
import { Prediction } from '../../interfaces/prediction.interface';
import { AutoCompleteService } from '../../services/auto-complete.service';
import { AutoCompleteInputComponent } from './auto-complete-input.component';

class MockAutoCompleteService {
  getPredictions = (value: string): Observable<Prediction[]> => of(null);
  getLatLng = (placeId: string): Observable<LatLng> => of(null);
}

describe('AutoCompleteInputComponent', () => {
  let component: AutoCompleteInputComponent;
  let fixture: ComponentFixture<AutoCompleteInputComponent>;
  let service: AutoCompleteService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutoCompleteInputComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        MatIconModule,
        FormsModule,
        MatAutocompleteModule,
        MatTooltipModule,
        BrowserAnimationsModule,
        MatIconModule
      ],
      providers: [{ provide: AutoCompleteService, useClass: MockAutoCompleteService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(AutoCompleteService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set search', () => {
    component.Search = 'test';
    expect(component.Search).toEqual('test');
    component.Search = 'test ';
    expect(component.Search).toEqual('test ');
  });

  it('should set setDetails ', fakeAsync(() => {
    const spy = spyOn(service, 'getLatLng').and.returnValue(of(null));
    component.setDetails('test');
    expect(component.Search).toEqual('');
  }));

  it('should trackById  return the placeId', () => {
    expect(component.trackById(0, { placeId: 'placeId' } as any)).toEqual('placeId');
  });
});
