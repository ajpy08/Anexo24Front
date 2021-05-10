import { TestBed } from '@angular/core/testing';

import { VerificatokenGuard } from './verificatoken.guard';

describe('VerificatokenGuard', () => {
  let guard: VerificatokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerificatokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
