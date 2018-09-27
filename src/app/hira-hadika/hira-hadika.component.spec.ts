import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiraHadikaComponent } from './hira-hadika.component';

describe('HiraHadikaComponent', () => {
  let component: HiraHadikaComponent;
  let fixture: ComponentFixture<HiraHadikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiraHadikaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiraHadikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
