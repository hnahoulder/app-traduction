import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEditionComponent } from './confirm-edition.component';

describe('ConfirmEditionComponent', () => {
  let component: ConfirmEditionComponent;
  let fixture: ComponentFixture<ConfirmEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
