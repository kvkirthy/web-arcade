import { TestBed } from '@angular/core/testing';

import { SwCommunicationService } from './sw-communication.service';

describe('SwCommunicationService', () => {
  let service: SwCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
