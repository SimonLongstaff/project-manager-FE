import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTaskRowComponent } from './sub-task-row.component';

describe('SubTaskRowComponent', () => {
  let component: SubTaskRowComponent;
  let fixture: ComponentFixture<SubTaskRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubTaskRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubTaskRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
