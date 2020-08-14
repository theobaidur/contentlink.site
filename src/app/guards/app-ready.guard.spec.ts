import { TestBed } from '@angular/core/testing';

import { AppReadyGuard } from './app-ready.guard';

describe('AppReadyGuard', () => {
  let guard: AppReadyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AppReadyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
