import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubtaskModalComponent } from './new-subtask-modal.component';

describe('NewSubtaskModalComponent', () => {
  let component: NewSubtaskModalComponent;
  let fixture: ComponentFixture<NewSubtaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSubtaskModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSubtaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
