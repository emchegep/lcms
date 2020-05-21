import { TestBed } from '@angular/core/testing';

import { ClaimantService } from './claimant.service';

describe('ClaimantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClaimantService = TestBed.get(ClaimantService);
    expect(service).toBeTruthy();
  });
});
