import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicalObjectDetailsComponent } from './magical-object-details.component';

describe('MagicalObjectDetailsComponent', () => {
  let component: MagicalObjectDetailsComponent;
  let fixture: ComponentFixture<MagicalObjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagicalObjectDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagicalObjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
