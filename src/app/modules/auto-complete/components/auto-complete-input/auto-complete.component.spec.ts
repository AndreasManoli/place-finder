import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { LatLng } from '../../interfaces/latLng.interface';
import { Prediction } from '../../interfaces/prediction.interface';
import { AutoCompleteService } from '../../services/auto-complete.service';
import { AutoCompleteInputComponent } from './auto-complete-input.component';

class MockAutoCompleteService {
  getPredictions = (value: string): Observable<Prediction[]> => of(null);
  getDetails = (placeId: string): Observable<LatLng> => of(null);
}

describe('AutoCompleteInputComponent', () => {
  let component: AutoCompleteInputComponent;
  let fixture: ComponentFixture<AutoCompleteInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutoCompleteInputComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot({}), MatIconModule, FormsModule, MatAutocompleteModule],
      providers: [{ provide: AutoCompleteService, useClass: MockAutoCompleteService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should trackById  return the placeId', () => {
    expect(component.trackById(0, { placeId: 'placeId' } as any)).toEqual('placeId');
  });
});
