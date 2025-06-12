import { TestBed } from '@angular/core/testing';

import { OnlineCoachingService } from './online-coaching.service';

describe('OnlineCoachingService', () => {
  let service: OnlineCoachingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineCoachingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
