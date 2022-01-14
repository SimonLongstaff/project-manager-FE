import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APILayerComponent } from './api-layer.component';

describe('APILayerComponent', () => {
  let component: APILayerComponent;
  let fixture: ComponentFixture<APILayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ APILayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(APILayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
