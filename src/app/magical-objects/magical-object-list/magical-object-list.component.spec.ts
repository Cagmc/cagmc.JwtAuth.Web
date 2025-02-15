import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicalObjectListComponent } from './magical-object-list.component';

describe('MagicalObjectListComponent', () => {
  let component: MagicalObjectListComponent;
  let fixture: ComponentFixture<MagicalObjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagicalObjectListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagicalObjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
