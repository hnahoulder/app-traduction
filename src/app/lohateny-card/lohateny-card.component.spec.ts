import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LohatenyCardComponent } from './lohateny-card.component';

describe('LohatenyCardComponent', () => {
  let component: LohatenyCardComponent;
  let fixture: ComponentFixture<LohatenyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LohatenyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LohatenyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
