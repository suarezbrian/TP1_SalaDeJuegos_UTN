import { TestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';

describe('UserService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
