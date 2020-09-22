import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDetailViewComponent } from './dynamic-detail-view.component';

describe('DynamicDetailViewComponent', () => {
  let component: DynamicDetailViewComponent;
  let fixture: ComponentFixture<DynamicDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
