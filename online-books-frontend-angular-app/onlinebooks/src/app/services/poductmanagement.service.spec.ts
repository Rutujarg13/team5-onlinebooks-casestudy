import { TestBed } from '@angular/core/testing';

import { PoductmanagementService } from './poductmanagement.service';

describe('PoductmanagementService', () => {
  let service: PoductmanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoductmanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
