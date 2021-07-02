import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBioComponent } from './create-bio.component';

describe('CreateBioComponent', () => {
  let component: CreateBioComponent;
  let fixture: ComponentFixture<CreateBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
