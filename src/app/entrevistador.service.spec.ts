import { TestBed } from '@angular/core/testing';

import { EntrevistadorService } from './entrevistador.service';

describe('EntrevistadorService', () => {
  let service: EntrevistadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrevistadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
