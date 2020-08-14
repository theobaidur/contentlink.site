import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerPageTitleComponent } from './inner-page-title.component';

describe('InnerPageTitleComponent', () => {
  let component: InnerPageTitleComponent;
  let fixture: ComponentFixture<InnerPageTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerPageTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
