import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MispartidasComponent } from './mispartidas.component';

describe('MispartidasComponent', () => {
  let component: MispartidasComponent;
  let fixture: ComponentFixture<MispartidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MispartidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MispartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
