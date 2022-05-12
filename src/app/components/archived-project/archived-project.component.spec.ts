import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedProjectComponent } from './archived-project.component';

describe('ArchivedProjectComponent', () => {
  let component: ArchivedProjectComponent;
  let fixture: ComponentFixture<ArchivedProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
