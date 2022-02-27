import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountmanagementComponent } from './discountmanagement.component';

describe('DiscountmanagementComponent', () => {
  let component: DiscountmanagementComponent;
  let fixture: ComponentFixture<DiscountmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
