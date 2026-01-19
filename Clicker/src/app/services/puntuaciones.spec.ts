import { TestBed } from '@angular/core/testing';

import { Puntuaciones } from './puntuaciones';

describe('Puntuaciones', () => {
  let service: Puntuaciones;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Puntuaciones);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
