import { TestBed } from '@angular/core/testing';

import { HttpCatalogService } from './http-catalog.service';

describe('HttpCatalogService', () => {
  let service: HttpCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
