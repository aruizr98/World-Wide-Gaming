import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarJuegoComponent } from './eliminar-juego.component';

describe('EliminarJuegoComponent', () => {
  let component: EliminarJuegoComponent;
  let fixture: ComponentFixture<EliminarJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarJuegoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
