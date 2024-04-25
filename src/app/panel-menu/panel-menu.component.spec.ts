import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelMenuComponent } from './panel-menu.component';

describe('PanelMenuComponent', () => {
  let component: PanelMenuComponent;
  let fixture: ComponentFixture<PanelMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
