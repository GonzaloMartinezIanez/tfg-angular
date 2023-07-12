import { TestBed } from '@angular/core/testing';

import { DesaparecidosService } from './desaparecidos.service';

describe('DesaparecidosService', () => {
  let service: DesaparecidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesaparecidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
