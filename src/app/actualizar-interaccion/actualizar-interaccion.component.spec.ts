import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarInteraccionComponent } from './actualizar-interaccion.component';

describe('ActualizarInteraccionComponent', () => {
  let component: ActualizarInteraccionComponent;
  let fixture: ComponentFixture<ActualizarInteraccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarInteraccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarInteraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
