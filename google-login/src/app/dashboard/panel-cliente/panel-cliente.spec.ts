import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCliente } from './panel-cliente';

describe('PanelCliente', () => {
  let component: PanelCliente;
  let fixture: ComponentFixture<PanelCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
