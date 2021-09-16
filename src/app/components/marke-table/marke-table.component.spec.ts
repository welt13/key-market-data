import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkeTableComponent } from './marke-table.component';

describe('MarkeTableComponent', () => {
  let component: MarkeTableComponent;
  let fixture: ComponentFixture<MarkeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
