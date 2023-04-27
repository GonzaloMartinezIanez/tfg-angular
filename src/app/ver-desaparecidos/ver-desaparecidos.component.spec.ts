import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDesaparecidosComponent } from './ver-desaparecidos.component';

describe('VerDesaparecidosComponent', () => {
  let component: VerDesaparecidosComponent;
  let fixture: ComponentFixture<VerDesaparecidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDesaparecidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDesaparecidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
