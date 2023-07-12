import { TestBed } from '@angular/core/testing';

import { NacionesService } from './naciones.service';

describe('NacionesService', () => {
  let service: NacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
