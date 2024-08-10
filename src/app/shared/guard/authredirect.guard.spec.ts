import { TestBed } from '@angular/core/testing';

import { AuthRedirect } from './authredirect.guard';

describe('AuthredirectGuard', () => {
  let guard: AuthRedirect;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthRedirect);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
