import { TestBed } from '@angular/core/testing';

import { CrudGamesService } from './crud-games.service';

describe('CrudGamesService', () => {
  let service: CrudGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
