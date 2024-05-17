import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaMinasComponent } from './busca-minas.component';

describe('BuscaMinasComponent', () => {
  let component: BuscaMinasComponent;
  let fixture: ComponentFixture<BuscaMinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscaMinasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscaMinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
