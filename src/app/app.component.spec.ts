import { Component, EventEmitter, Input, Output } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-search-wrapper',
  template: 'search-wrapper.component.html'
})
class MockSearchWrapperComponent {
  @Output() center = new EventEmitter();
  @Output() places = new EventEmitter();
}

@Component({
  selector: 'app-google-map',
  template: 'google-map.component.html'
})
class MockGoogleMapComponent {
  @Input() Center;
  @Input() PointsOfInterest;
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatSidenavModule, BrowserAnimationsModule],
      declarations: [AppComponent, MockSearchWrapperComponent, MockGoogleMapComponent]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'place-finder'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('place-finder');
  });

  it(`should set center'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.setCenter({ lat: 1, lng: 2 });
    fixture.detectChanges();
    expect(app.center).toEqual({ lat: 1, lng: 2 });
  });

  it(`should set center'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.setPlaces([]);
    fixture.detectChanges();
    expect(app.places).toEqual([]);
  });
});
