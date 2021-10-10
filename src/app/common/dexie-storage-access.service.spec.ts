import { TestBed } from '@angular/core/testing';

import { DexieStorageAccessService } from './dexie-storage-access.service';

describe('DexieStorageAccessService', () => {
  let service: DexieStorageAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DexieStorageAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
