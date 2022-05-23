import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuForoComponent } from './menu-foro.component';

describe('MenuForoComponent', () => {
  let component: MenuForoComponent;
  let fixture: ComponentFixture<MenuForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuForoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
