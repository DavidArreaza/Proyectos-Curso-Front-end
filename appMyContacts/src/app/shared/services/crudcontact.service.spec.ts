import { TestBed } from '@angular/core/testing';

import { CrudcontactService } from './crudcontact.service';

describe('CrudcontactService', () => {
  let service: CrudcontactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudcontactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
