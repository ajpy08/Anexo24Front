import { TestBed } from '@angular/core/testing';

import { AgenteAduanalService } from './agente-aduanal.service';

describe('AgenteAduanalService', () => {
  let service: AgenteAduanalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgenteAduanalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
