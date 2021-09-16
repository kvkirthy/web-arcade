import { TestBed } from '@angular/core/testing';

import { IdbStorageAccessService } from './idb-storage-access.service';

describe('IdbStorageAccessService', () => {
  let service: IdbStorageAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdbStorageAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
