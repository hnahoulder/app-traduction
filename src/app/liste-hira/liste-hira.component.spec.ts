import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeHiraComponent } from './liste-hira.component';

describe('ListeHiraComponent', () => {
  let component: ListeHiraComponent;
  let fixture: ComponentFixture<ListeHiraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeHiraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeHiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
