import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { APP_CONFIG, PLACE_FINDER_CONFIG } from 'src/app/providers/config.provider';
import { TypeSelectorComponent } from './type-selector.component';

describe('TypeSelectorComponent', () => {
  let component: TypeSelectorComponent;
  let fixture: ComponentFixture<TypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TypeSelectorComponent],
      imports: [
        TranslateModule.forRoot({}),
        MatSelectModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        FormsModule,
        MatInputModule,
        MatIconModule
      ],
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
