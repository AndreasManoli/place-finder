import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { APP_CONFIG, PLACE_FINDER_CONFIG } from 'src/app/providers/config.provider';
import { TypeSelectorComponent } from './type-selector.component';

describe('TypeSelectorComponent', () => {
  let component: TypeSelectorComponent;
  let fixture: ComponentFixture<TypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TypeSelectorComponent],
      imports: [TranslateModule.forRoot({})],
      providers: [{ provide: APP_CONFIG, useValue: PLACE_FINDER_CONFIG }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set Type', () => {
    const spy = spyOn(component.type, 'emit').and.stub();
    component.Type = 'type';
    expect(spy).toHaveBeenCalled();
  });
});
