import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInteraccionComponent } from './ver-interaccion.component';

describe('VerInteraccionComponent', () => {
  let component: VerInteraccionComponent;
  let fixture: ComponentFixture<VerInteraccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerInteraccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerInteraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
