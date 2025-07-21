import { TestBed } from '@angular/core/testing';

import { CaliZoneAntonyService } from './cali-zone-antony.service';

describe('CaliZoneAntonyService', () => {
  let service: CaliZoneAntonyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaliZoneAntonyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
