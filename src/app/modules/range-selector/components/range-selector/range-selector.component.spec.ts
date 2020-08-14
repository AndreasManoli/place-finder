import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { APP_CONFIG, PLACE_FINDER_CONFIG } from 'src/app/providers/config.provider';
import { RangeSelectorComponent } from './range-selector.component';

describe('RangeSelectorComponent', () => {
  let component: RangeSelectorComponent;
  let fixture: ComponentFixture<RangeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RangeSelectorComponent],
      imports: [MatIconModule, MatSliderModule, MatTooltipModule, TranslateModule.forRoot({})],
      providers: [{ provide: APP_CONFIG, useValue: PLACE_FINDER_CONFIG }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call radiusChange ', () => {
    const spy = spyOn(component.radius, 'emit').and.stub();
    component.radiusChange({ value: 10 });
    expect(spy).toHaveBeenCalled();
  });
  it('should call formatLabel  ', () => {
    expect(component.formatLabel(10)).toEqual('10');
    expect(component.formatLabel(1000)).toEqual('1k');
  });
});
