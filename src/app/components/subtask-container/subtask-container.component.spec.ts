import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtaskContainerComponent } from './subtask-container.component';

describe('SubtaskContainerComponent', () => {
  let component: SubtaskContainerComponent;
  let fixture: ComponentFixture<SubtaskContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtaskContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtaskContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
