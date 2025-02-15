import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMagicalObjectComponent } from './create-magical-object.component';

describe('CreateMagicalObjectComponent', () => {
  let component: CreateMagicalObjectComponent;
  let fixture: ComponentFixture<CreateMagicalObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMagicalObjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMagicalObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
