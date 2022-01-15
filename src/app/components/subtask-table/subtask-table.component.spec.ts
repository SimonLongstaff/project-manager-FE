import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtaskTableComponent } from './subtask-table.component';

describe('SubtaskTableComponent', () => {
  let component: SubtaskTableComponent;
  let fixture: ComponentFixture<SubtaskTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtaskTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtaskTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
