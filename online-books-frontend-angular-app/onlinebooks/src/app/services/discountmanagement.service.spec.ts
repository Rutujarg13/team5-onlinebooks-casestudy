import { TestBed } from '@angular/core/testing';

import { DiscountmanagementService } from './discountmanagement.service';

describe('DiscountmanagementService', () => {
  let service: DiscountmanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountmanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
