import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerPageSidebarLayoutComponent } from './inner-page-sidebar-layout.component';

describe('InnerPageSidebarLayoutComponent', () => {
  let component: InnerPageSidebarLayoutComponent;
  let fixture: ComponentFixture<InnerPageSidebarLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerPageSidebarLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerPageSidebarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
