import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMagicalObjectComponent } from './edit-magical-object.component';

describe('UpdateMagicalObjectComponent', () => {
  let component: EditMagicalObjectComponent;
  let fixture: ComponentFixture<EditMagicalObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMagicalObjectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditMagicalObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
