import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagEditModalComponent } from './tag-edit-modal.component';

describe('TagEditModalComponent', () => {
  let component: TagEditModalComponent;
  let fixture: ComponentFixture<TagEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
