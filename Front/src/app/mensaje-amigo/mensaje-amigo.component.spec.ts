import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeAmigoComponent } from './mensaje-amigo.component';

describe('MensajeAmigoComponent', () => {
  let component: MensajeAmigoComponent;
  let fixture: ComponentFixture<MensajeAmigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeAmigoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeAmigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
