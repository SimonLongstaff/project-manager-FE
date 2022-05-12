import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkDoneModalComponent } from './work-done-modal.component';

describe('WorkDoneModalComponent', () => {
  let component: WorkDoneModalComponent;
  let fixture: ComponentFixture<WorkDoneModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkDoneModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkDoneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
