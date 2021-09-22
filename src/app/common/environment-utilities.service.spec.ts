import { TestBed } from '@angular/core/testing';

import { EnvironmentUtilitiesService } from './environment-utilities.service';

describe('EnvironmentUtilitiesService', () => {
  let service: EnvironmentUtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironmentUtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
